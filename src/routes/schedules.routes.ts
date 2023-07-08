import { Router } from "express";
import { createScheduleController, listRealEstateSchedulesController } from "../controllers/schedules.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import adminOnlyMiddleware from "../middlewares/adminOnly.middleware";

const schedulesRoutes: Router = Router()

schedulesRoutes.post(
  '',
  ensureTokenIsValidMiddleware,
  createScheduleController
)

schedulesRoutes.get(
  '/realEstate/:id',
  ensureTokenIsValidMiddleware,
  adminOnlyMiddleware,
  listRealEstateSchedulesController
)

export default schedulesRoutes