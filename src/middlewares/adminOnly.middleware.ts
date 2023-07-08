import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import 'dotenv/config'

const adminOnlyMiddleware = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.locals.admin) {
        return next()
    }
    throw new AppError('Insufficient permission', 403)
}

export default adminOnlyMiddleware