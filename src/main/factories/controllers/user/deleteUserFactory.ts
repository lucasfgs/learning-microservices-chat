import { UserModel } from '@infra/database/mongoose/schemas/User'
import { GenecricDeletedResponse } from '@presentation/responses/GenericDeletedResponse'
import { DeleteUserUseCase } from '@application/useCases/user/DeleteUserUseCase'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { DeleteUserController } from '@presentation/controllers/user/DeleteUserController'

export const deleteUserFactory = () => {
  const validation = new IdParamValidation<string>()
  const deleteUseCase = new DeleteUserUseCase(UserModel, validation)

  const deletePresenter = new GenecricDeletedResponse()
  const deleteController = new DeleteUserController(deleteUseCase, deletePresenter)

  return {
    deleteUseCase,
    deletePresenter,
    deleteController
  }
}
