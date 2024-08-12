import express from "express";
import { createReservation, getUserReservations, cancelReservation } from "../controllers/reservation.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Crear una nueva reserva
router.post("/", verifyUser, createReservation);

// Obtener las reservas de un usuario
router.get("/:userId", verifyUser, getUserReservations);

// Cancelar una reserva
router.delete("/:id", verifyUser, cancelReservation);

export default router;
