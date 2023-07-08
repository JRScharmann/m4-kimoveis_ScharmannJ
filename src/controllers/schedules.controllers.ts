import { Request, Response } from "express"
import createSchedulesService from "../services/schedules/createSchedules.service"
import listSchedulesByRealEstate from "../services/schedules/listSchedulesByRealEstate.service"

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const scheduleData = req.body
    const userId = res.locals.userId
    await createSchedulesService(userId, scheduleData)
    
    return res.status(201).json({
        message: 'Schedule created'
    })
}

const listRealEstateSchedulesController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateId = parseInt(req.params.id)
    const schedules = await listSchedulesByRealEstate(realEstateId)
    return res.status(200).json(schedules)
}

export {
    createScheduleController,
    listRealEstateSchedulesController
}