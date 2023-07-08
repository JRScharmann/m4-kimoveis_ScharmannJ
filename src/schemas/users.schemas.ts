import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().default(false),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    deletedAt: z.string().or(z.date()).nullable()
})

const userSchemaRequest = userSchema.omit({ deletedAt: true, updatedAt: true, createdAt: true, id: true })

const userSchemaUpdateRequest = userSchemaRequest.partial()

const userSchemaResponse = userSchema.omit({
    password: true
})

const usersSchemaResponse = z.array(userSchemaResponse)

export {
    userSchema,
    userSchemaRequest,
    userSchemaResponse,
    usersSchemaResponse,
    userSchemaUpdateRequest
}