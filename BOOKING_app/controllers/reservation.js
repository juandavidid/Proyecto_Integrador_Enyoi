import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
export const createReservation = async (req, res, next) => {
    const { user, hotel, room, roomNumber, startDate, endDate, totalPrice } = req.body;
    console.log("datos que recibe el servidor ", req.body);

    try {
        const newReservation = new Reservation({
            user: user, //userId,
            hotel: hotel,  //hotelId,
            room: room, //roomId,
            roomNumber,
            startDate,
            endDate,
            totalPrice,
        });

        const savedReservation = await newReservation.save();

        // Función para sumar días a una fecha
        const addDays = (date, days) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        // Función para generar un rango de fechas entre startDate y endDate
        const getDateRange = (start, end) => {
            let dateArray = [];
            let currentDate = new Date(start);
            while (currentDate <= new Date(end)) {
                dateArray.push(new Date(currentDate));
                currentDate = addDays(currentDate, 1);
            }
            return dateArray;
        };

        // Obtener el rango de fechas
        const datesToAdd = getDateRange(startDate, endDate);

        // Actualizar la disponibilidad de la habitación
        await Room.updateOne(
            { "roomNumbers._id": room, "roomNumbers.number": roomNumber },
            { $push: { "roomNumbers.$.unavailableDates": { $each: datesToAdd } } }
        );

        res.status(200).json(savedReservation);

    } catch (err) {
        next(err);
    }
};
export const getUserReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ user: req.params.userId }).populate("hotel room");
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
};
export const cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return next(createError(404, "Reservation not found!"));

        await Reservation.findByIdAndDelete(req.params.id);

        res.status(200).json("Reservation has been canceled.");
    } catch (err) {
        next(err);
    }
};
