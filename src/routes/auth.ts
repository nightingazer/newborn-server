import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/register', controller.register)
router.post('/login', controller.login)

export { router as authRouter }
