import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { TCategoriesResponse } from "../../interfaces/realEstate.interfaces"

const listCategoriesService = async (): Promise<TCategoriesResponse> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] = await categoryRepository.find()

    return categories
}

export default listCategoriesService