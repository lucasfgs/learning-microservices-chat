import { CreateUserUseCase } from '@application/useCases/user/CreateUserUseCase'
import { UserRequiredFieldsValidation } from '@application/validation/user/leaf/UserRequiredFieldsValidation'
import { IUser } from '@domain/models/IUser'
import { CreateUserController } from '@presentation/controllers/user/CreateUserController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'
import { UserModel } from '@infra/database/mongoose/schemas/User'

export const createUserFactory = () => {
  const validation = new UserRequiredFieldsValidation()

  const useCase = new CreateUserUseCase(UserModel, validation)

  const presenter = new GenericCreatedResponse<IUser>()
  const createController = new CreateUserController(useCase, presenter)

  return {
    createController
  }
}
