import * as express from 'express'
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'

import { morganMiddleware } from './middleware/morgan.middleware'
import { authRouter, categoryRouter, itemRouter, orderRouter } from './routes'
import { Logger } from './utils/'
import { passportMiddleware } from './middleware'
import { ConfigKeys } from './configs/keys'

export const app = express()

app.use(morganMiddleware)
mongoose.connect(ConfigKeys.mongoConnectString).then(() => Logger.info('Mongoose is connected to the Data Base!'))

app.use(passport.initialize())
passportMiddleware(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' })
})

app.get('/logger', (req, res) => {
  Logger.info('this is info')
  Logger.error('this is error')
  Logger.debug('this is debug')
  Logger.http('this is http')
  res.send()
})

const appRouter = express.Router()

appRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Api says: "Hello world"' })
})

appRouter.use('/categories', categoryRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/items', itemRouter)
appRouter.use('/orders', orderRouter)

app.use('/api', appRouter)
