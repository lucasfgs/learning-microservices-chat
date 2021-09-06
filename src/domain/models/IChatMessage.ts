export interface IReadByRecipient {
    _id: false,
    readByUserId: string,
    readAt: Date,
}

export interface IChatMessage {
    id?: string,
    room: string,
    message: string,
    postedByUser: string,
    readByRecipients: IReadByRecipient[]

}

export type TCreateChatMessage = Pick<IChatMessage, 'room' | 'message' | 'postedByUser'>
