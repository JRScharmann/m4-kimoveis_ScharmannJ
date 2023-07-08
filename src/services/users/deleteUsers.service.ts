import { Repository } from "typeorm";
import { TUserResponse, TUserUpdateRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const deleteUserService = async (
    userId: number
): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData: User | null = await userRepository.findOneBy({
        id: userId
    })
    if (oldUserData === null) {
        throw new AppError('User not found', 404)
    }

    await userRepository.update({
        id: userId
    },
        {
            deletedAt: new Date()
        })
}

export default deleteUserService