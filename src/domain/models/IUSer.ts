
export interface IUser {
    _id?: string,
    name: string,
    userId: string
}

export type TCreateUser = Omit<IUser, '_id'>
