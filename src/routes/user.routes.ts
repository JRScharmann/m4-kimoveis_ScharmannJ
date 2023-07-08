import { Router } from "express";
import { createUsersController, deleteUserController, listUsersController, updateUsersController } from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdateRequest } from "../schemas/users.schemas";
import ensureEmailAlreadyExistsMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";

const userRoutes: Router = Router()

userRoutes.post(
    '',
    ensureDataIsValidMiddleware(userSchemaRequest),
    ensureEmailAlreadyExistsMiddleware,
    createUsersController
)
userRoutes.get(
    '',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    listUsersController
)
userRoutes.patch(
    '/:id',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureDataIsValidMiddleware(userSchemaUpdateRequest),
    updateUsersController
)
userRoutes.delete(
    '/:id',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    deleteUserController
)

export default userRoutes