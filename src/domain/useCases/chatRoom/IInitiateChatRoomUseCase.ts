import { TInitiateChatRoom, TInitiateChatRoomResponse } from '@domain/models/IChatRoom'

export interface IInitiateChatRoomUseCase {
    initiate(request: TInitiateChatRoom): Promise<TInitiateChatRoomResponse>
}
