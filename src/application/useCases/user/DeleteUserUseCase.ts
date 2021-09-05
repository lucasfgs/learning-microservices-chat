import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { UserModel } from '@infra/database/mongoose/schemas/User'
import { IDeleteUserUseCase } from '@domain/useCases/user/IDeleteUserUseCase'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor (
    private readonly repository: typeof UserModel,
     private readonly validation: ValidationComposite<string>
  ) {}

  async delete (id: string): Promise<void> {
    await this.validation.validate(id)

    return await this.repository.deleteByUserById(id)
  }
}
