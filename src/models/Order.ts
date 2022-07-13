import { model, ObjectId, Schema, SchemaTypes } from 'mongoose'

export interface IOrderList {
  name: string
  quantity: number
  cost: number
}

export interface IOrder {
  date: Date
  order: number
  list: IOrderList[]
  user: ObjectId
}

const schema = new Schema<IOrder>({
  date: {
    type: Date,
    default: Date.now(),
  },
  order: {
    type: Number,
    required: true,
  },
  list: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
})

export const Order = model('order', schema)
