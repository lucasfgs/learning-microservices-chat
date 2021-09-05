/* eslint-disable array-callback-return */
import { RequestValidationError } from '@application/errors/RequestValidationError'
import { ValidationComposite } from '@application/protocols/validation/ValidationComposite'
import { isString } from '@application/helpers/strings/isString'

type ParamRequest = {
    id: number
}

export class IdParamValidation<T = ParamRequest> extends ValidationComposite<T> {
  validate (id: T): void {
    if (!id) return

    const error = new RequestValidationError('Invalid request')

    if (!isString(id)) { error.messages.push('Invalid field: id') }

    if (error.messages.length > 1) { throw error }
  }
}
