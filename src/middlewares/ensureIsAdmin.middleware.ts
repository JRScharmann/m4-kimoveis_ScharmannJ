import { Repository } from "typeorm"
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import 'dotenv/config'
import { User } from "../entities";
import { AppDataSource } from "../data-source";

const ensureIsAdminMiddleware = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    if (res.locals.userId === req.params.id) {
        return next()
    }
    if (res.locals.admin) {
        return next()
    }
    if (!req.params.id) {
        throw new AppError('Insufficient permission', 403)
    }
    const userToUpdate: User | null = await userRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (userToUpdate === null) {
        throw new AppError('User not found', 404)
    }
    throw new AppError('Insufficient permission', 403)
}

export default ensureIsAdminMiddleware