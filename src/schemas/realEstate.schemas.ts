import { z } from 'zod'

const categoriesSchema = z.object({
    id: z.number(),
    name: z.string()
})

const categoriesArraySchemaResponse = z.array(categoriesSchema)

const categoriesSchemaRequest = categoriesSchema.omit({
    id: true
})

const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const addressSchemaRequest = addressSchema.omit({
    id: true
})

const addressWithoutNumber = addressSchemaRequest.omit({
    number: true
})

const realEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.number().or(z.string()),
    size: z.number().gt(0),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    addressId: z.number(),
    categoryId: z.number()
})

const realEstateGetSchemaResponse = z.array(realEstateSchema.omit({
    categoryId: true,
    addressId: true
}).extend({
    address: addressSchema
}))

const realEstateSchemaRequest = realEstateSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    addressId: true,
}).extend({
    address: addressSchemaRequest
})

const realEstateResponse = realEstateSchema.omit({
    categoryId: true,
    addressId: true
}).extend({
    address: addressSchema,
    category: categoriesSchema
})

export {
    addressSchema,
    addressSchemaRequest,
    addressWithoutNumber,
    realEstateSchema,
    realEstateGetSchemaResponse,
    realEstateSchemaRequest,
    realEstateResponse,
    categoriesSchema,
    categoriesSchemaRequest,
    categoriesArraySchemaResponse
}