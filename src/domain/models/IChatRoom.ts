
export interface IChatRoom {
    _id?: string,
    name: string,
    userIds: Array<string>,
    type: string,
    chatInitiator: string
}

export type TInitiateChatRoom = Pick<IChatRoom, 'name' | 'userIds' | 'chatInitiator'>

export type TInitiateChatRoomResponse = {
    isNew: boolean,
    message: string,
    chatRoomId: string
  }
