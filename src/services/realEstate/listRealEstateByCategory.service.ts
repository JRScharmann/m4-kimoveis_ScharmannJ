import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { TCategories } from "../../interfaces/realEstate.interfaces"
import { AppError } from "../../error"

const listRealEstateByCategoryService = async (categoryId: number): Promise<TCategories> => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  const category: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true
    }
  })
  if (!category) {
    throw new AppError('Category not found', 404)
  }

  return category
}

export default listRealEstateByCategoryService
