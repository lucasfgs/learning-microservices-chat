import { Router } from 'express'
import { routeAdapter } from '@main/adapters/http/routeAdapter'
import { createUserFactory } from '@main/factories/controllers/user/createUserFactory'

export default (router: Router): void => {
  const { createUserController } = createUserFactory()

  // router.get('/users', middlewareAdapter(authenticate, 'User.create', ['Marketing']), routeAdapter(findAllUsersController))
  router.post('/users', routeAdapter(createUserController))
  // router.put('/users/:id', routeAdapter(updateUserController))
  // router.delete('/users/:id', routeAdapter(deleteUserController))
}
