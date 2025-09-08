import Class from '../models/class.model.js'
import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'

export const classes = asyncHandler(async (req, res) => {
    const classes = await Class.find().populate('board').sort({ class: 1 })
    return ApiResponse.success(classes).send(res)
})
export const addClass = asyncHandler(async (req, res) => {
    const { body } = req
    const newClass = await Class.create(body)
    if (!newClass) throw new ErrorResponse('Class not added', 500)

    return ApiResponse.created({}, 'Class added successfully').send(res)
})
export const deleteClass = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedClass = await Class.findByIdAndDelete(id)
    if (!deletedClass) throw new ErrorResponse('Class not deleted', 500)
    return ApiResponse.success({}, 'Class deleted successfully').send(res)
})
export const editClass = asyncHandler(async (req, res) => {})
export const singleClass = asyncHandler(async (req, res) => {})
