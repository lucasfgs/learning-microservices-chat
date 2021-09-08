import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IUser, TCreateUser } from '@domain/models/IUser'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class CreateUserController implements Controller {
  constructor (private readonly user: ICreateUserUseCase, private readonly presenter: HttpResponseHandler<TCreateUser>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: HttpRequest<TCreateUser>): Promise<HttpResponse<IUser>> {
    this.validateRequest(request)

    const user = await this.user.create(request.body)

    return await this.presenter.response(user)
  }

  private validateRequest (request: HttpRequest<IUser>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'name') ||
      !objectKeyExists(request.body, 'userId')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
