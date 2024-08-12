import express from "express"
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

const logRequest = (req, res, next) => {
    console.log(`Solicitud recibida en ${req.method} ${req.originalUrl}`);
    next(); // Pasa al siguiente middleware o función controladora
};

/*
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete you account")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("hello admin, you are logged in and you can delete all accounts")
})
*/


//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id", verifyUser, deleteUser)


//GET
router.get("/:id", verifyUser, getUser)


//GET ALL
router.get("/", verifyAdmin, logRequest, getUsers)

export default router