import { Server } from 'http'
import { printDelimiter } from './console-utils'
import { Logger } from './logger'

export const listenProcessEvents = (server: Server) => {
  const logCloseMessage = () => {
    const address = server.address()
    if (!address) {
      Logger.info('Server has been closed')
      return
    }
    if (typeof address === 'string') {
      Logger.info(`Server on http://${address} has been closed`)
      return
    }
    Logger.info(
      `Server on http://${address.address === '::' ? 'localhost' : address.address}:${address.port} has been stopped`
    )
  }

  process.on('SIGTERM', function () {
    // called on restart. also helps against ts-node-dev freezes on reloads
    server.close(() => logCloseMessage())
    Logger.debug('Restarting...')
    printDelimiter()
    process.exit(0)
  })

  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    console.log()
    server.close(() => logCloseMessage())
    Logger.debug('Terminated')
    printDelimiter()
    process.exit(0)
  })
}
