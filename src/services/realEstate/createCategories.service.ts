import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TCategories, TCategoriesRequest } from "../../interfaces/realEstate.interfaces";
import { categoriesSchema } from "../../schemas/realEstate.schemas";

const createCategoriesService = async (categoryData: TCategoriesRequest): Promise<TCategories> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category = categoryRepository.create(categoryData)
    await categoryRepository.save(category)

    const returnCategory: TCategories = categoriesSchema.parse(category)

    return returnCategory
}

export default createCategoriesService