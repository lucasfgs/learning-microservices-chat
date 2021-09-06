import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'
import { InitiateChatRoomValidation } from '@application/validation/chatRoom/leaf/InitiateChatRoomValidation'
import { InitiateChatRoomUseCase } from '@application/useCases/room/InitiateChatRoomUseCase'
import { InitiateChatRoomController } from '@presentation/controllers/room/InitiateChatRoomController'
import { ChatRoomModel } from '@infra/database/mongoose/schemas/ChatRoom'
import { TInitiateChatRoomResponse } from '@domain/models/IChatRoom'

export const initiateChatRoomFactory = () => {
  const validation = new InitiateChatRoomValidation()

  const useCase = new InitiateChatRoomUseCase(ChatRoomModel, validation)

  const presenter = new GenericCreatedResponse<TInitiateChatRoomResponse>()
  const createController = new InitiateChatRoomController(useCase, presenter)

  return {
    createController
  }
}
