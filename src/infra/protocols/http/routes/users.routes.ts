import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { createUserFactory } from '@main/factories/controllers/user/createUserFactory'
import { findAllUsersFactory } from '@main/factories/controllers/user/findAllUsersFactory'
import { deleteUserFactory } from '@main/factories/controllers/user/deleteUserFactory'

export default (router: Router): void => {
  const { createController } = createUserFactory()
  const { findAllController } = findAllUsersFactory()
  const { deleteController } = deleteUserFactory()

  router.get('/users', routeAdapter(findAllController))
  router.post('/users', routeAdapter(createController))
  router.delete('/users/:id', routeAdapter(deleteController))
}
