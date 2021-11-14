import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateUserController } from './controllers/CreateUserController'

const router = Router()

router.post('/user', new CreateUserController().handle)
router.post('/user/authenticate', new AuthenticateUserController().handle)

export { router }
