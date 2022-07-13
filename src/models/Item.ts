import { model, ObjectId, Schema, SchemaType, SchemaTypes, Types } from 'mongoose'

export interface IItem {
  name: string
  cost: number
  category: ObjectId
  user: ObjectId
}

const schema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: SchemaTypes.ObjectId,
    ref: 'category',
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
})

export const Item = model('item', schema)
