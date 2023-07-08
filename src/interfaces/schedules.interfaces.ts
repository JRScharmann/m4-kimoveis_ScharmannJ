import { z } from "zod"
import { scheduleSchema, scheduleSchemaRequest, scheduleSchemaResponse } from "../schemas/schedules.schemas"

type TSchedule = z.infer<typeof scheduleSchema>
type TScheduleRequest = z.infer<typeof scheduleSchemaRequest>
type TSchedulesResponse = z.infer<typeof scheduleSchemaResponse>

export {
  TSchedule,
  TScheduleRequest,
  TSchedulesResponse
}