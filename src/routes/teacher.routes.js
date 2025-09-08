import { Router } from 'express'
import {
    addTeacher,
    deleteTeacher,
    editTeacher,
    singleTeacher,
    teachers,
} from '../controllers/teacher.controller.js'
import { accessController } from '../middlewares/AuthMiddleware.js'

const teacherRouter = Router()

teacherRouter
    .route('/')
    .get(accessController('admin'), teachers)
    .post(accessController('admin'), addTeacher)
teacherRouter
    .route('/:id')
    .get(accessController('admin'), singleTeacher)
    .put(accessController('admin'), editTeacher)
    .delete(accessController('admin'), deleteTeacher)

export default teacherRouter
