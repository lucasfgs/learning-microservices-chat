import { HttpRequest } from '@application/protocols/requests/Http'

export type TGenericRequestParam<B, P = {id: string}> = HttpRequest<B, P>
