import { Router } from 'express'
import * as passport from 'passport'
import { OrderController } from '../controllers'

const router = Router()
const controller = new OrderController()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', controller.getAll)
router.get('/:orderId', controller.getOne)
router.post('/', controller.create)

export { router as orderRouter }
