import { z } from 'zod'
import { realEstateSchema } from './realEstate.schemas'
import { userSchema } from './users.schemas'

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  userId: z.number()
})

const scheduleSchemaRequest = scheduleSchema.omit({
  id: true,
  userId: true
})

const scheduleSchemaResponse = z.array(scheduleSchema.omit({
  realEstateId: true,
  userId: true
}).extend({
  realEstate: realEstateSchema,
  user: userSchema
}))

export {
  scheduleSchema,
  scheduleSchemaResponse,
  scheduleSchemaRequest
}