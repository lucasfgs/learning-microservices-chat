import { UserModel } from '@infra/database/mongoose/schemas/User'
import { FindAllUsersUseCase } from '@application/useCases/user/FindAllUsersUseCase'
import { FindAllUsersController } from '@presentation/controllers/user/FindAllUsersController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'
import { IUser } from '@domain/models/IUser'

export const findAllUsersFactory = () => {
  const useCase = new FindAllUsersUseCase(UserModel)

  const presenter = new GenericSuccessResponse<IUser[]>()
  const findAllController = new FindAllUsersController(useCase, presenter)

  return {
    findAllController
  }
}
