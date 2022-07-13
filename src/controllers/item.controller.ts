import { Request, Response } from 'express'
import { ErrorHandler } from '../decorators/error-handler.decorator'
import { Category, IItem, Item, NotFoundError } from '../models'

export class ItemController {
  @ErrorHandler
  async get(req: Request, res: Response) {
    const categoryId = req.params.categoryId
    if (!(await Category.exists({ _id: categoryId }))) {
      throw new NotFoundError(`Category with id "${categoryId}" does not exist.`)
    }
    const items = await Item.find({ category: categoryId })
    res.status(200).json(items)
  }

  @ErrorHandler
  async create(req: Request, res: Response) {
    const { name, cost, categoryId } = req.body
    const user = req.user.userId
    const item = new Item({ name, cost, category: categoryId, user })
    const result = await item.save()
    res.status(201).json(result)
  }

  @ErrorHandler
  async delete(req: Request, res: Response) {
    const itemId = req.params.itemId
    if (!(await Item.exists({ _id: itemId }))) {
      throw new NotFoundError(`Item with id "${itemId}" does not exist.`)
    }
    await Item.findByIdAndRemove(itemId)
    res.status(200).json({ message: `item was successfully removed` })
  }

  @ErrorHandler
  async update(req: Request, res: Response) {
    const itemId = req.params.itemId
    if (!(await Item.exists({ _id: itemId }))) {
      throw new NotFoundError(`Item with id "${itemId}" does not exits.`)
    }
    const item = await Item.findByIdAndUpdate(itemId, req.body, { new: true })
    res.status(200).json(item)
  }
}
