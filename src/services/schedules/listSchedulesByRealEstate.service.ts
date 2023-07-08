import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { AppError } from "../../error"

const listSchedulesByRealEstate = async (realEstateId: number): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId
    },
    relations: {
      schedules: {
        user: true
      }
    }
  })
  if (realEstate === null) {
    throw new AppError('RealEstate not found', 404)
  }

  return realEstate
}

export default listSchedulesByRealEstate
