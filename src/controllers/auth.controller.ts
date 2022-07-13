import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { ConfigKeys } from '../configs/keys'
import { ErrorHandler } from '../decorators/error-handler.decorator'
import { UnauthorizedError, User } from '../models'

export class AuthController {
  @ErrorHandler
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })
    if (!candidate) {
      throw new UnauthorizedError('Wrong email')
    }
    if (!candidate.checkPassword(password)) {
      throw new UnauthorizedError('Wrong password')
    }
    const token = jwt.sign({ userId: candidate.id, email: candidate.email }, ConfigKeys.jwtSecret)
    res.status(200).json({ token: `Bearer ${token}` })
  }

  @ErrorHandler
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    const candidate = await User.findOne({
      email,
    })
    if (candidate) {
      throw new Error('User already exists')
    }
    const user = new User({ email, password })
    await user.save()
    res.status(201).json({ message: 'User has been created successfully' })
  }
}
