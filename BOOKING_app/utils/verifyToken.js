import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.js"


export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    console.log("TOKEN USERS", token);

    if (!token) {
        return next(createError(401, "You are not autheticated!"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}


export const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized!"));
        }
    })

};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })

}