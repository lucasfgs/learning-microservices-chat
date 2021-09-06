import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TCreateChatMessage } from '@domain/models/IChatMessage'
import { ICreateMessageInChatRoomUseCase } from '@domain/useCases/message/ICreateMessageInChatRoomUseCase'
import { ChatMessageModel } from '@infra/database/mongoose/schemas/ChatMessage'

export class CreateMessageInChatRoomUseCase implements ICreateMessageInChatRoomUseCase {
  constructor (
        private readonly repository: typeof ChatMessageModel,
         private readonly validation: ValidationComposite<TCreateChatMessage>
  ) {}

  async createPostInChatRoom (request: TCreateChatMessage): Promise<any> {
    await this.validation.validate(request)

    const { message, postedByUser, room } = request

    const resp = await this.repository.createPostInChatRoom(room, message, postedByUser)

    global.io.sockets.in(request.room).emit('new message', { message, user: postedByUser })

    return resp
  }
}
