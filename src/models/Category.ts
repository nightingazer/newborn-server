import { model, ObjectId, Schema } from 'mongoose'

export interface ICategory {
  imageSrc: string
  name: string
  user: ObjectId
}

const schema = new Schema<ICategory>({
  imageSrc: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

export const Category = model<ICategory>('category', schema)
