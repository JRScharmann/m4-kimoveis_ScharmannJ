import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { TRealEstateGetResponse } from "../../interfaces/realEstate.interfaces"
import { realEstateGetSchemaResponse } from "../../schemas/realEstate.schemas"

const listRealEstateService = async (): Promise<TRealEstateGetResponse> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstates: RealEstate[] = await realEstateRepository.find()

    const returnRealEstates: TRealEstateGetResponse = realEstateGetSchemaResponse.parse(realEstates)

    return returnRealEstates
}

export default listRealEstateService