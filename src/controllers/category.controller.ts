import { Request, Response } from 'express'
import { ErrorHandler } from '../decorators/error-handler.decorator'
import { Category, ICategory, NotFoundError } from '../models'

export class CategoryController {
  @ErrorHandler
  async get(req: Request, res: Response) {
    const categories = await Category.find({ user: req.user.userId })
    res.status(200).json(categories)
  }

  @ErrorHandler
  async getById(req: Request, res: Response) {
    const category = await Category.findOne({ _id: req.params.categoryId, user: req.user.userId })
    if (!category) {
      throw new NotFoundError(`Category with id "${req.params.categoryId}" does not exist.`)
    }
    res.status(200).json(category)
  }

  @ErrorHandler
  async create(req: Request, res: Response) {
    const category = new Category({
      imageSrc: req.file?.path || '',
      name: req.body.name,
      user: req.user.userId,
    })
    res.status(201).json(await category.save())
  }

  @ErrorHandler
  async update(req: Request, res: Response) {
    const patchValue: Partial<ICategory> = req.body
    if (req.file) {
      patchValue.imageSrc = req.file.path
    }
    const candidate = await Category.findById(req.params.categoryId)
    if (!candidate) {
      throw new NotFoundError(`The category with id ${req.params.categoryId} not found`)
    }
    await candidate.updateOne(patchValue, { new: true })
    const result = await Category.findById(req.params.categoryId)
    res.status(200).json(result)
  }

  @ErrorHandler
  async delete(req: Request, res: Response) {
    const candidate = await Category.findById(req.params.categoryId)
    if (!candidate) {
      throw new NotFoundError(`The category with id ${req.params.categoryId} not found`)
    }
    const result = await candidate.remove()
    res.status(200).json(result)
  }
}
