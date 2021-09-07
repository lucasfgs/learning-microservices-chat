import { NotFoundError } from '@application/errors/NotFoundError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TCreateChatMessage } from '@domain/models/IChatMessage'
import { ICreateMessageInChatRoomUseCase } from '@domain/useCases/message/ICreateMessageInChatRoomUseCase'
import { ChatMessageModel } from '@infra/database/mongoose/schemas/ChatMessage'
import { UserModel } from '@infra/database/mongoose/schemas/User'

export class CreateMessageInChatRoomUseCase implements ICreateMessageInChatRoomUseCase {
  constructor (
        private readonly repository: typeof ChatMessageModel,
        private readonly userRepository: typeof UserModel,
         private readonly validation: ValidationComposite<TCreateChatMessage>
  ) {}

  async createPostInChatRoom (request: TCreateChatMessage): Promise<any> {
    await this.validation.validate(request)

    const { message, postedByUser, room } = request

    const data = await this.repository.createPostInChatRoom(room, message, postedByUser)

    const user = await this.userRepository.findById(postedByUser)

    if (!user) throw new NotFoundError('User does not exists')

    global.io.sockets.emit('new message', { message, room, user: postedByUser, name: user.name, createdAt: data.createdAt })

    return data
  }
}
