import { model, Schema } from 'mongoose'
import * as bcrypt from 'bcryptjs'
export interface IUser {
  email: string
  password: string
  checkPassword: (password: string) => boolean
}

const schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

schema.pre('save', function (next) {
  const user = this
  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
  this.password = hash
  next()
})

schema.method('checkPassword', async function (password: string) {
  const user = this
  return await bcrypt.compare(password, user.password)
})

export const User = model<IUser>('user', schema)

const user = new User({
  email: '',
  password: '',
})
