import { Request, Response } from "express"
import { TCategoriesRequest, TRealEstateRequest } from "../interfaces/realEstate.interfaces"
import createCategoriesService from "../services/realEstate/createCategories.service"
import listCategoriesService from "../services/realEstate/listCategories.service"
import createRealEstateService from "../services/realEstate/createRealEstate.service"
import listRealEstateService from "../services/realEstate/listRealEstate.service"
import listRealEstateByCategoryService from "../services/realEstate/listRealEstateByCategory.service"

const createCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categoryData: TCategoriesRequest = req.body
    const newCategory = await createCategoriesService(categoryData)
    return res.status(201).json(newCategory)
}

const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories = await listCategoriesService()
    return res.status(200).json(categories)
}

const listRealEstateByCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const categoryId = parseInt(req.params.id)
    const realEstates = await listRealEstateByCategoryService(categoryId)
    return res.status(200).json(realEstates)
}

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateData: TRealEstateRequest = req.body
    const newRealEstate = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

const listRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstates = await listRealEstateService()
    return res.status(200).json(realEstates)
}

export {
    createCategoriesController,
    listCategoriesController,
    createRealEstateController,
    listRealEstateController,
    listRealEstateByCategoryController,
}