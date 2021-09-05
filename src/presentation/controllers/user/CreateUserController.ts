import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { IUser } from '@domain/models/IUser'
import { ICreateUserUseCase } from '@domain/useCases/user/ICreateUserUseCase'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class CreateUserController implements Controller {
  constructor (private readonly user: ICreateUserUseCase, private readonly presenter: HttpResponseHandler<IUser>) {
    this.user = user
    this.presenter = presenter
  }

  async handle (request: HttpRequest<IUser>): Promise<HttpResponse<IUser>> {
    this.validateRequest(request)

    const { name } = request.body

    const user = await this.user.create(name)

    return await this.presenter.response(user)
  }

  private validateRequest (request: HttpRequest<IUser>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'name')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
