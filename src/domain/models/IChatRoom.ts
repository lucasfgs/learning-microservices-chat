
export interface IChatRoom {
    _id?: string,
    userIds: Array<string>,
    type: string,
    chatInitiator: string
}

export type TInitiateChatRoom = Pick<IChatRoom, 'userIds' | 'chatInitiator'>

export type TInitiateChatRoomResponse = {
    isNew: boolean,
    message: string,
    chatRoomId: string
  }
