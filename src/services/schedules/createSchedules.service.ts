import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { TScheduleRequest } from "../../interfaces/schedules.interfaces";
import { scheduleSchemaRequest } from "../../schemas/schedules.schemas";
import { AppError } from "../../error";

const createSchedulesService = async (userId: number, scheduleData: TScheduleRequest): Promise<void> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const scheduleRequest = scheduleSchemaRequest.parse(scheduleData)

    const [year, day, month] = scheduleRequest.date.split('/')
    const date = new Date(`${year}-${month}-${day}T${scheduleRequest.hour}`)

    if (date.getHours() >= 18 || date.getHours() < 8) {
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
    }

    if ([0, 6].includes(date.getDay())) {
        throw new AppError('Invalid date, work days are monday to friday', 400)
    }
    const foundUserSchedule: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
        .where('schedule.date = :date AND schedule.hour = :hour AND schedule.userId = :userId', {
            date: scheduleRequest.date,
            hour: scheduleRequest.hour,
            userId: userId
        }).getOne()
    if (foundUserSchedule !== null) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }

    const foundRealEstateSchedule: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
        .where('schedule.date = :date AND schedule.hour = :hour AND schedule.realEstateId = :realEstateId', {
            date: scheduleRequest.date,
            hour: scheduleRequest.hour,
            realEstateId: scheduleRequest.realEstateId
        }).getOne()
    if (foundRealEstateSchedule !== null) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    const foundRealEstate: RealEstate | null = await realEstateRepository.findOneBy({
        id: scheduleRequest.realEstateId
    })
    if (foundRealEstate === null) {
        throw new AppError('RealEstate not found', 404)
    }

    await scheduleRepository.createQueryBuilder('schedule').insert().into(Schedule).values([{
        ...scheduleRequest,
        user: {
            id: userId
        }
    }]).execute()
}

export default createSchedulesService