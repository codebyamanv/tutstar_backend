import { Router } from 'express'
import { accessController } from '../middlewares/AuthMiddleware.js'
import { addClass, classes, deleteClass } from '../controllers/class.controller.js'

const classRouter = Router()
classRouter.route('/').post(accessController('admin'), addClass).get(classes)
classRouter.route('/:id').delete(accessController('admin'), deleteClass)
export default classRouter
