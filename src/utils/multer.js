import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder = 'uploads/other'

        switch (file.fieldname) {
            case 'avatar':
                uploadFolder = 'uploads/avatar'
                break
            case 'course':
                uploadFolder = 'uploads/course'
                break
            case 'board':
                uploadFolder = 'uploads/board'
                break
            default:
                uploadFolder = 'uploads/other'
        }

        fs.mkdirSync(uploadFolder, { recursive: true })

        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
    },
})

export const multerUpload = multer({
    storage,
    // limits: { fileSize: 5 * 1024 * 1024 },
})
