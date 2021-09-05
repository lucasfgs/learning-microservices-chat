import { IUser } from '@domain/models/IUser'
import { IFindAllUsersUseCase } from '@domain/useCases/user/IFindAllUsersUseCase'
import { UserModel } from '@infra/database/mongoose/schemas/User'

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor (private readonly repository: typeof UserModel) {
    this.repository = repository
  }

  async findAll (): Promise<IUser[]> {
    return await this.repository.getUsers()
  }
}
