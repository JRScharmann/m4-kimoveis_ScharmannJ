import { Router } from "express";
import { createCategoriesController, createRealEstateController, listCategoriesController, listRealEstateByCategoryController, listRealEstateController } from "../controllers/realEstate.controller";
import ensureCategoryNameAlreadyExistsMiddleware from "../middlewares/ensureCategoryNameAlreadyExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";

const realEstateRoutes: Router = Router()

realEstateRoutes.post(
    '/categories',
    ensureCategoryNameAlreadyExistsMiddleware,
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    createCategoriesController
)

realEstateRoutes.get(
    '/categories',
    listCategoriesController
)

realEstateRoutes.get(
    '/categories/:id/realEstate',
    listRealEstateByCategoryController
)

realEstateRoutes.post(
    '/realEstate',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    createRealEstateController
)

realEstateRoutes.get(
    '/realEstate',
    listRealEstateController
)

export default realEstateRoutes