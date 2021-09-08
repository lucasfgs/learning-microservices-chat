import { isString } from '@application/helpers/strings/isString'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { TCreateUser } from '@domain/models/IUser'

export class UserRequiredFieldsValidation extends ValidationComposite<TCreateUser> {
  validate (request: TCreateUser): void {
    const error = new RequestValidationError('Invalid request')

    if (!request) throw error

    const { name, userId } = request

    if (!isString(name)) { error.messages.push('Invalid field: name') }

    if (!isString(userId)) { error.messages.push('Invalid field: userId') }

    if (error.messages.length > 1) { throw error }
  }
}
