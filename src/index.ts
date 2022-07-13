// import all the module augmentations for external libraries
import {} from './library-ext'

import * as packageJson from '../package.json'

import { app } from './app'
import { Logger } from './utils'
import { listenProcessEvents } from './utils'

const port = process.env['PORT'] || 5000

const server = app.listen(port, () =>
  Logger.info(`Server is listening on http://localhost:${port}. (Newborn server v.${packageJson?.version})`)
)

listenProcessEvents(server)
