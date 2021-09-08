import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { UserModel } from '@infra/database/mongoose/schemas/User'
import { IUser, TCreateUser } from '@domain/models/IUser'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    private readonly repository: typeof UserModel,
     private readonly validation: ValidationComposite<TCreateUser>) {}

  async create (request: TCreateUser): Promise<IUser> {
    const { name, userId } = request

    await this.validation.validate(request)

    return await this.repository.createUser(name, userId)
  }
}
