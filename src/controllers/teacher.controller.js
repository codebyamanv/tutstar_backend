import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import Teacher from '../models/teacher.model.js'

export const addTeacher = asyncHandler(async (req, res) => {
    const { body } = req
    await Teacher.create(body)
    return ApiResponse.created({}, 'Teacher added successfully').send(res)
})

export const teachers = asyncHandler(async (_, res) => {
    const teachers = await Teacher.find()
    return ApiResponse.success(teachers).send(res)
})
export const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Teacher.findByIdAndDelete(id)
    return ApiResponse.success({}, 'Teacher deleted successfully').send(res)
})
export const singleTeacher = asyncHandler(async (req, res) => {})
export const editTeacher = asyncHandler(async (req, res) => {})
