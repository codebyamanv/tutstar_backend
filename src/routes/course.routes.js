import { Router } from 'express'
import { addCourse, courses, deleteCourse, singleCourse } from '../controllers/course.controller.js'
import { accessController } from '../middlewares/AuthMiddleware.js'
import { multerUpload } from '../utils/multer.js'

const courseRouter = Router()
courseRouter
    .route('/')
    .post(accessController('admin'), multerUpload.single('course'), addCourse)
    .get(courses)
courseRouter.route('/:id').delete(accessController('admin'), deleteCourse)
courseRouter.get('/:slug', singleCourse)
export default courseRouter
