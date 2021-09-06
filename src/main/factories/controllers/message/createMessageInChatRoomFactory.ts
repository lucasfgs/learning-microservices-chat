import { CreateMessageInChatRoomUseCase } from '@application/useCases/message/CreateMessageInChatRoomUseCase'
import { CreateMessageInChatRoomController } from '@presentation/controllers/message/CreateMessageInChatRoomController'
import { ChatMessageModel } from '@infra/database/mongoose/schemas/ChatMessage'
import { CreateMessageValidation } from '@application/validation/message/leaf/CreateMessageValidation'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const createMessageInChatRoomFactory = () => {
  const validation = new CreateMessageValidation()

  const useCase = new CreateMessageInChatRoomUseCase(ChatMessageModel, validation)

  const presenter = new GenericSuccessResponse<any[]>()
  const createController = new CreateMessageInChatRoomController(useCase, presenter)

  return {
    createController
  }
}
