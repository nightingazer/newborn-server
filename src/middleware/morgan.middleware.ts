import * as morgan from 'morgan'
import { StreamOptions } from 'morgan'
import { Logger } from '../utils/'

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'
  return env !== 'development'
}

export const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  skip,
  stream,
})
