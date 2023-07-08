import { z } from 'zod'
import { addressSchema, categoriesArraySchemaResponse, categoriesSchema, categoriesSchemaRequest, realEstateGetSchemaResponse, realEstateResponse, realEstateSchema, realEstateSchemaRequest } from '../schemas/realEstate.schemas'

type TAddress = z.infer<typeof addressSchema>

type TRealEstate = z.infer<typeof realEstateSchema>
type TRealEstateResponse = z.infer<typeof realEstateResponse>
type TRealEstateGetResponse = z.infer<typeof realEstateGetSchemaResponse>
type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>

type TCategories = z.infer<typeof categoriesSchema>
type TCategoriesResponse = z.infer<typeof categoriesArraySchemaResponse>
type TCategoriesRequest = z.infer<typeof categoriesSchemaRequest>

export {
    TAddress,
    TRealEstate,
    TRealEstateRequest,
    TRealEstateResponse,
    TRealEstateGetResponse,
    TCategories,
    TCategoriesRequest,
    TCategoriesResponse
}