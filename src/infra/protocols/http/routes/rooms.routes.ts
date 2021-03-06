import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { initiateChatRoomFactory } from '@main/factories/controllers/room/initiateChatRoomFactory'
import { findChatRoomByUserIdFactory } from '@main/factories/controllers/room/findChatRoomByUserIdFactory'

export default (router: Router): void => {
  const { createController } = initiateChatRoomFactory()
  const { findChatRoomByUserIdController } = findChatRoomByUserIdFactory()

  router.post('/rooms', routeAdapter(createController))
  router.get('/rooms/users/:id', routeAdapter(findChatRoomByUserIdController))
}
