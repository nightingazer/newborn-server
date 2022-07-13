import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'
import { ConfigKeys } from '../configs/keys'
import { User } from '../models'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ConfigKeys.jwtSecret,
}

export const passportMiddleware = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      const user = await User.findById(payload.userId).select('email id')
      if (user) {
        done(null, { userId: user.id, email: user.email })
        return
      }
      done(null, false)
    })
  )
}
