
export interface IDeleteUserUseCase {
    delete(id: String): Promise<void>
}
