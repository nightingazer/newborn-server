import { Router } from 'express'
import * as passport from 'passport'
import { CategoryController } from '../controllers'
import { imageUpload } from '../middleware/image-upload.middleware'

const router = Router()
const controller = new CategoryController()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', controller.get)
router.get('/:categoryId', controller.getById)
router.post('/', imageUpload.single('image'), controller.create)
router.patch('/:categoryId', imageUpload.single('image'), controller.update)
router.delete('/:categoryId', controller.delete)

export { router as categoryRouter }
