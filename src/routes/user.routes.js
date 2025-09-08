import { Router } from 'express'
import { register, login, logout, currentUser } from '../controllers/user.controller.js'
import { accessController } from '../middlewares/AuthMiddleware.js'
import { multerUpload } from '../utils/multer.js'

const userRouter = Router()
userRouter.route('/').post(multerUpload.single('avatar'), register)

userRouter.post('/current-user', accessController('student', 'admin', 'teacher'), currentUser)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
export default userRouter
