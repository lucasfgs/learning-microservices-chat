import { IUser } from '@domain/models/IUser'

export interface ICreateUserUseCase {
    create(name: String): Promise<IUser>
}
