import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { IChatRoom } from '@domain/models/IChatRoom'
import { IFindChatRoomByUserIdUseCase } from '@domain/useCases/room/IFindChatRoomByUserId'
import { ChatRoomModel } from '@infra/database/mongoose/schemas/ChatRoom'

export class FindChatRoomByUserIdUseCase implements IFindChatRoomByUserIdUseCase {
  constructor (
        private readonly repository: typeof ChatRoomModel,
         private readonly validation: ValidationComposite<string>
  ) {}

  async getChatRoomsByUserId (userId: string): Promise<IChatRoom[]> {
    await this.validation.validate(userId)

    return await this.repository.getChatRoomsByUserId(userId)
  }
}
