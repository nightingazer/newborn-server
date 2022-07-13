import * as multer from 'multer'
import { diskStorage } from 'multer'
import * as path from 'path'

const storage = diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  },
})

export const imageUpload = multer({
  storage,
})
