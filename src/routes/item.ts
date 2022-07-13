import { Router } from 'express'
import * as passport from 'passport'
import { ItemController } from '../controllers'

const router = Router()
const controller = new ItemController()

router.use(passport.authenticate('jwt', { session: false }))

router.post('/', controller.create)
router.get('/:categoryId', controller.get)
router.delete('/:itemId', controller.delete)

export { router as itemRouter }
