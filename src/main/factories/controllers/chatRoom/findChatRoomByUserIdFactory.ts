import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'
import { ChatRoomModel } from '@infra/database/mongoose/schemas/ChatRoom'
import { IChatRoom } from '@domain/models/IChatRoom'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { FindChatRoomByUserIdUseCase } from '@application/useCases/chatRoom/FindChatRoomByUserIdUseCase'
import { FindChatRoomByUserIdController } from '@presentation/controllers/chatRoom/FindChatRoomByUserIdController'

export const findChatRoomByUserIdFactory = () => {
  const validation = new IdParamValidation<string>()

  const useCase = new FindChatRoomByUserIdUseCase(ChatRoomModel, validation)

  const presenter = new GenericCreatedResponse<IChatRoom[]>()
  const findChatRoomByUserIdController = new FindChatRoomByUserIdController(useCase, presenter)

  return {
    findChatRoomByUserIdController
  }
}
