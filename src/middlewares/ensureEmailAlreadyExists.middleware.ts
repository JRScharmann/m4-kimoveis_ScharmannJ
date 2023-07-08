import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureEmailAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const { email } = req.body as User

    const user: User | null = await userRepository.findOne({
        where: {
            email
        }
    })

    if (!user) {
        return next()
    }

    throw new AppError('Email already exists', 409)
}

export default ensureEmailAlreadyExistsMiddleware