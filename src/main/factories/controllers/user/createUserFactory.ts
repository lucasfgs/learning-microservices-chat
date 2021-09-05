import { CreateUserUseCase } from '@application/useCases/user/CreateUserUseCase'
import { UserRequiredFieldsValidation } from '@application/validation/user/leaf/UserRequiredFieldsValidation'
import { IUser } from '@domain/models/IUser'
import { CreateUserController } from '@presentation/controllers/user/CreateUserController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'
import { UserModel } from '@infra/database/mongoose/schemas/User'

export const createUserFactory = () => {
  const userValidation = new UserRequiredFieldsValidation()

  const createUserUseCase = new CreateUserUseCase(UserModel, userValidation)

  const createUserPresenter = new GenericCreatedResponse<IUser>()
  const createUserController = new CreateUserController(createUserUseCase, createUserPresenter)

  return {
    createUserUseCase,
    createUserPresenter,
    createUserController
  }
}
