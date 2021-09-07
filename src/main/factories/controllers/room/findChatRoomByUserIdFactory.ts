import { ChatRoomModel } from '@infra/database/mongoose/schemas/ChatRoom'
import { IChatRoom } from '@domain/models/IChatRoom'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { FindChatRoomByUserIdUseCase } from '@application/useCases/room/FindChatRoomByUserIdUseCase'
import { FindChatRoomByUserIdController } from '@presentation/controllers/room/FindChatRoomByUserIdController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findChatRoomByUserIdFactory = () => {
  const validation = new IdParamValidation<string>()

  const useCase = new FindChatRoomByUserIdUseCase(ChatRoomModel, validation)

  const presenter = new GenericSuccessResponse<IChatRoom[]>()
  const findChatRoomByUserIdController = new FindChatRoomByUserIdController(useCase, presenter)

  return {
    findChatRoomByUserIdController
  }
}
