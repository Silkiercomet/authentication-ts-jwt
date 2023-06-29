import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.log(err)

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Internal Server Error "})
}