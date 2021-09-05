import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { UserModel } from '@infra/database/mongoose/schemas/User'
import { IUser } from '@domain/models/IUser'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    private readonly repository: typeof UserModel,
     private readonly validation: ValidationComposite<string>) {}

  async create (name: string): Promise<IUser> {
    await this.validation.validate(name)

    return await this.repository.createUser(name)
  }
}
