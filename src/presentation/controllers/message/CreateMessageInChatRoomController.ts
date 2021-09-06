import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpRequest, HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { ICreateMessageInChatRoomUseCase } from '@domain/useCases/message/ICreateMessageInChatRoomUseCase'
import { TCreateChatMessage } from '@domain/models/IChatMessage'

export class CreateMessageInChatRoomController implements Controller {
  constructor (
        private readonly useCase: ICreateMessageInChatRoomUseCase,
        private readonly presenter: HttpResponseHandler<any>
  ) { }

  async handle (request: HttpRequest<TCreateChatMessage>): Promise<HttpResponse<any>> {
    this.validateRequest(request)

    const { message, postedByUser, room } = request.body

    const data = await this.useCase.createPostInChatRoom({ message, postedByUser, room })

    return await this.presenter.response(data)
  }

  private validateRequest (request: HttpRequest<TCreateChatMessage>) {
    if (
      !objectKeyExists(request, 'body') ||
            !objectKeyExists(request.body, 'message') ||
            !objectKeyExists(request.body, 'postedByUser') ||
            !objectKeyExists(request.body, 'room')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
