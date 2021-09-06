import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { Controller } from '@application/protocols/controllers/Controller'
import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'
import { IChatRoom } from '@domain/models/IChatRoom'
import { IFindChatRoomByUserIdUseCase } from '@domain/useCases/room/IFindChatRoomByUserId'
import { TGenericRequestParam } from '@application/protocols/requests/GenericRequestParam'

export class FindChatRoomByUserIdController implements Controller {
  constructor (private readonly useCase: IFindChatRoomByUserIdUseCase, private readonly presenter: HttpResponseHandler<IChatRoom[]>) {
    this.useCase = useCase
    this.presenter = presenter
  }

  async handle (request: TGenericRequestParam<any>): Promise<HttpResponse<IChatRoom[]>> {
    this.validateRequest(request)

    const { id } = request.params

    const data = await this.useCase.getChatRoomsByUserId(id)

    return await this.presenter.response(data)
  }

  private validateRequest (request: TGenericRequestParam<any>) {
    if (
      !objectKeyExists(request, 'params') ||
      !objectKeyExists(request.params, 'id')
    ) {
      throw new RequestValidationError('Invalid request')
    }
  }
}
