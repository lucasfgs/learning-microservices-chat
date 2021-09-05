/* eslint-disable array-callback-return */
import { isString } from '@application/helpers/strings/isString'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TInitiateChatRoom } from '@domain/models/IChatRoom'

export class InitiateChatRoomValidation extends ValidationComposite<TInitiateChatRoom> {
  validate (request: TInitiateChatRoom): void {
    const error = new RequestValidationError('Invalid request')
    if (!request) throw error

    const { chatInitiator, userIds } = request

    if (!isString(chatInitiator)) { error.messages.push('Invalid field: chatInitiator') }

    userIds.map(userId => {
      if (!isString(userId)) { error.messages.push('Invalid field: userId') }
    })

    if (error.messages.length > 1) { throw error }
  }
}
