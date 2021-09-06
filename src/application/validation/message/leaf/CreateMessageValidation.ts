/* eslint-disable array-callback-return */
import { isString } from '@application/helpers/strings/isString'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TCreateChatMessage } from '@domain/models/IChatMessage'

export class CreateMessageValidation extends ValidationComposite<TCreateChatMessage> {
  validate (request: TCreateChatMessage): void {
    const error = new RequestValidationError('Invalid request')
    if (!request) throw error

    const { message, postedByUser, room } = request

    if (!isString(message)) { error.messages.push('Invalid field: message') }

    if (!isString(postedByUser)) { error.messages.push('Invalid field: postedByUser') }

    if (!isString(room)) { error.messages.push('Invalid field: room') }

    if (error.messages.length > 1) { throw error }
  }
}
