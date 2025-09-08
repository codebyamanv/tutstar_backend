import { Router } from 'express'
import { addBoard, boards, deleteBoard } from '../controllers/board.controller.js'
import { accessController } from '../middlewares/AuthMiddleware.js'
import { multerUpload } from '../utils/multer.js'

const boardRouter = Router()

boardRouter
    .route('/')
    .get(boards)
    .post(accessController('admin'), multerUpload.single('board'), addBoard)

boardRouter.route('/:id').delete(accessController('admin'), deleteBoard)

export default boardRouter
