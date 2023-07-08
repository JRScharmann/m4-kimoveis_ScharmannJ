import { Repository } from "typeorm";
import { TUserResponse, TUserUpdateRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/users.schemas";

const updateUserService = async (
    userData: TUserUpdateRequest,
    userId: number
): Promise<TUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData: User | null = await userRepository.findOneBy({
        id: userId
    })

    const { admin, ...userPatch } = userData

    const newUserData: User = userRepository.create({
        ...oldUserData,
        ...userPatch,
    })
    await userRepository.save(newUserData)

    const returnUser: TUserResponse = userSchemaResponse.parse(newUserData)

    return returnUser
}

export default updateUserService