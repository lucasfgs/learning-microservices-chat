import { IUser, TCreateUser } from '@domain/models/IUser'

export interface ICreateUserUseCase {
    create(request: TCreateUser): Promise<IUser>
}
