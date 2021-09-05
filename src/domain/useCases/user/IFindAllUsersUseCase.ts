import { IUser } from '@domain/models/IUser'

export interface IFindAllUsersUseCase {
    findAll(): Promise<IUser[]>
}
