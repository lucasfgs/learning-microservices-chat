import { TCreateChatMessage } from '@domain/models/IChatMessage'

export interface ICreateMessageInChatRoomUseCase {
    createPostInChatRoom(request: TCreateChatMessage): Promise<any>
}
