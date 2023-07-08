import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { TRealEstateRequest, TRealEstateResponse } from "../../interfaces/realEstate.interfaces";
import { addressSchemaRequest, realEstateResponse, realEstateSchemaRequest } from "../../schemas/realEstate.schemas";
import { AppError } from "../../error";

const createRealEstateService = async (realEstateData: TRealEstateRequest): Promise<TRealEstateResponse> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const realEstateRequest = realEstateSchemaRequest.parse(realEstateData)
    const address = addressSchemaRequest.parse(realEstateData.address)

    const existingAddress: Address | null = await addressRepository.findOne({
        where: {
            ...address,
            number: address.number ?? ''
        }
    })
    if (existingAddress !== null) {
        throw new AppError('Address already exists', 409)
    }
    const findCategory: Category | null = await categoryRepository.findOneBy({
        id: realEstateData.categoryId
    })
    const realEstate = realEstateRepository.create({
        ...realEstateRequest,
        category: findCategory!
    })
    await realEstateRepository.save(realEstate)
    return realEstateResponse.parse(realEstate)
}

export default createRealEstateService