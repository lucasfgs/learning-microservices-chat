export interface IReadByRecipient {
    _id: false,
    readByUserId: String,
    readAt: Date,
}

export interface IChatMessage {
    id?: string,
    room: string,
    message: string,
    type: 'text',
    postedByUser: string,
    readByRecipients: IReadByRecipient[]

}

export interface ICreateChatMessage {
    room: string,
    message: string,
    postedByUser: string,
}
