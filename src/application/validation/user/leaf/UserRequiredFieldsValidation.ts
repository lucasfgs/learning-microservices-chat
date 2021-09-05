import { isString } from '@application/helpers/strings/isString'
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'

export class UserRequiredFieldsValidation extends ValidationComposite<string> {
  validate (name: string): void {
    const error = new RequestValidationError('Invalid request')

    if (!isString(name)) { error.messages.push('Invalid field: name') }

    if (error.messages.length > 1) { throw error }
  }
}
