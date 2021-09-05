import { IChatRoom } from '@domain/models/IChatRoom'

export interface IFindChatRoomByUserIdUseCase {
    getChatRoomsByUserId(userId: string): Promise<IChatRoom[]>
}
