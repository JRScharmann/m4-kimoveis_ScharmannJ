import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureCategoryNameAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const { name } = req.body as Category

    const category: Category | null = await categoryRepository.findOne({
        where: {
            name
        }
    })

    if (!category) {
        return next()
    }

    throw new AppError('Category already exists', 409)
}

export default ensureCategoryNameAlreadyExistsMiddleware