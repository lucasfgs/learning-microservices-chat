import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { TInitiateChatRoom, TInitiateChatRoomResponse } from '@domain/models/IChatRoom'
import { IInitiateChatRoomUseCase } from '@domain/useCases/room/IInitiateChatRoomUseCase'

export class InitiateChatRoomController implements Controller {
  constructor (private readonly useCase: IInitiateChatRoomUseCase, private readonly presenter: HttpResponseHandler<TInitiateChatRoomResponse>) {
    this.useCase = useCase
    this.presenter = presenter
  }

  async handle (request: HttpRequest<TInitiateChatRoom>): Promise<HttpResponse<TInitiateChatRoomResponse>> {
    this.validateRequest(request)

    const data = await this.useCase.initiate(request.body)

    return await this.presenter.response(data)
  }

  private validateRequest (request: HttpRequest<TInitiateChatRoom>) {
    if (
      !objectKeyExists(request, 'body') ||
      !objectKeyExists(request.body, 'name') ||
      !objectKeyExists(request.body, 'userIds') ||
      !objectKeyExists(request.body, 'chatInitiator')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
