import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);

    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err);

    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotal has been deleted")
    } catch (err) {
        next(err);

    }
}

//OBTENER LOS HOTELES POR ID
export const getHotel = async (req, res, next) => {
    try {
        console.log(req.params);
        const hotel = await Hotel.findById(req.params.id)  // Metodo .findById() que se usa para consultar los parametos de un objeto que esta en la Base de datos
        console.log(hotel);
        res.status(200).json(hotel) // Se envia una respuesta al cliente   estados 200 y  convertir un objeto a objeto JSON
    } catch (err) {
        next(err);

    }
}

// OBTENER TODOS LOS HOTELES
export const getHotels = async (req, res, next) => {
    const { limit, min, max, ...others } = req.query; // Desestructuracion de Objetos
    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(req.query.limit); //Obtener datos de los Hoteles por filtros
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);

    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        /*
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        */
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },

        ]);
    } catch (err) {
        next(err);

    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}