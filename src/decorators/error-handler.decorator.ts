import { Request, Response } from 'express'
import { NetworkError } from '../models'
import { Logger } from '../utils/'

export function ErrorHandler(target: Object, propKey: string | symbol, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function
  descriptor.value = async (req: Request, res: Response): Promise<void> => {
    try {
      await original.apply(target, [req, res])
    } catch (err: any) {
      if (err instanceof NetworkError) {
        Logger.error(`${err.message} CODE ${err.statusCode}`)
        res.status(err.statusCode).json({
          isOk: false,
          error: err,
        })
        return
      }
      const message = err.message || 'Internal Error'
      const error = new NetworkError(message)
      Logger.error(error.message)
      res.status(500).json({
        isOk: false,
        error,
      })
    }
  }
}
