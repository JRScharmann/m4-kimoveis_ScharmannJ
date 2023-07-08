import { Request, Response } from "express";
import { TUserRequest, TUserResponse, TUserUpdateRequest } from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUsers.service";

const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const userData: TUserRequest = req.body
    const newUser = await createUsersService(userData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await listUsersService()
    return res.json(users)
}

const updateUsersController = async (req: Request, res: Response): Promise<Response> => {
    const userData: TUserUpdateRequest = req.body
    const userId: number = parseInt(req.params.id)

    const newUserData: TUserResponse = await updateUserService(userData, userId)
    return res.json(newUserData)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)

    await deleteUserService(userId)
    return res.status(204).json()
}

export {
    createUsersController,
    listUsersController,
    updateUsersController,
    deleteUserController
}