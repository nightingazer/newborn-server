import { Request, Response } from 'express'
import { FilterQuery, isValidObjectId, QuerySelector } from 'mongoose'
import { ErrorHandler } from '../decorators/error-handler.decorator'
import { BadRequestError, IOrder, IOrderList, NotFoundError, Order } from '../models'

export class OrderController {
  @ErrorHandler
  async getAll(req: Request, res: Response) {
    const query: FilterQuery<IOrder> = {
      user: req.user.userId,
    }

    if (req.query.start || req.query.end) {
      const date: QuerySelector<Date> = {}
      if (req.query.start) date.$gte = new Date(<string>req.query.start)
      if (req.query.end) date.$lte = new Date(<string>req.query.end)
      query.date = date
    }

    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+(req.query?.offset || 0))
      .limit(+(req.query?.limit || 0))
    res.status(200).json(orders)
  }

  @ErrorHandler
  async getOne(req: Request, res: Response) {
    const orderId: string = req.params.orderId
    if (!isValidObjectId(orderId)) {
      throw new BadRequestError(`"${orderId}" is not a valid ObjectId`)
    }
    const order = await Order.findById(orderId)
    if (!order) {
      throw new NotFoundError(`An order with ${orderId} does not exists`)
    }
    res.status(200).json(order)
  }

  @ErrorHandler
  async create(req: Request, res: Response) {
    const lastOrder = await Order.findOne({ user: req.user.userId }).sort({ date: -1 })
    const list: IOrderList = req.body.list
    if (!list) {
      throw new BadRequestError("There must be 'list' parameter on the request body")
    }
    const order = new Order({
      list,
      user: req.user.userId,
      order: lastOrder ? lastOrder.order + 1 : 0,
    })
    res.status(201).json(await order.save())
  }
}
