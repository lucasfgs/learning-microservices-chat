import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TInitiateChatRoom, TInitiateChatRoomResponse } from '@domain/models/IChatRoom'
import { IInitiateChatRoomUseCase } from '@domain/useCases/chatRoom/IInitiateChatRoomUseCase'
import { ChatRoomModel } from '@infra/database/mongoose/schemas/ChatRoom'

export class InitiateChatRoomUseCase implements IInitiateChatRoomUseCase {
  constructor (
        private readonly repository: typeof ChatRoomModel,
         private readonly validation: ValidationComposite<TInitiateChatRoom>
  ) {}

  async initiate (request: TInitiateChatRoom): Promise<TInitiateChatRoomResponse> {
    await this.validation.validate(request)

    const allUserIds = [...request.userIds, request.chatInitiator]

    return await this.repository.initiateChat(allUserIds, request.chatInitiator)
  }
}
