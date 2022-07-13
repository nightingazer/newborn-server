import * as winston from 'winston'

interface CustomLogger extends winston.Logger {
  ERROR: winston.LeveledLogMethod
  WARN: winston.LeveledLogMethod
  INFO: winston.LeveledLogMethod
  HTTP: winston.LeveledLogMethod
  DEBUG: winston.LeveledLogMethod
}

const levels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  HTTP: 3,
  DEBUG: 4,
}

const level = (): string => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'DEBUG' : 'INFO'
}

const colors = {
  ERROR: 'red',
  WARN: 'yellow',
  INFO: 'green',
  HTTP: 'magenta',
  DEBUG: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
)

const transports = [new winston.transports.Console({ level: level() })]

export const Logger = <CustomLogger>winston.createLogger({
  level: level(),
  levels: levels,
  format,
  transports,
})

Logger.error = Logger.ERROR
Logger.warn = Logger.WARN
Logger.info = Logger.INFO
Logger.http = Logger.HTTP
Logger.debug = Logger.DEBUG
