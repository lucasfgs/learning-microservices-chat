import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { createMessageInChatRoomFactory } from '@main/factories/controllers/message/createMessageInChatRoomFactory'

export default (router: Router): void => {
  const { createController } = createMessageInChatRoomFactory()

  router.post('/messages', routeAdapter(createController))
}
