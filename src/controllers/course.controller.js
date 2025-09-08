import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import Course from '../models/course.model.js'
import slugify from 'slugify'

export const addCourse = asyncHandler(async (req, res) => {
    const { body } = req
    const file = req.file

    const slug = slugify(body.title, { lower: true, strict: true })

    if (!file) {
        return res.status(400).json({ error: 'License file is required' })
    }
    const imagePath = file.path.replace(/\\/g, '/')
    const imageURL = `${req.protocol}://${req.get('host')}/${imagePath}`

    const newCourse = await Course.create({ ...body, imagePath, image: imageURL, slug })
    if (!newCourse) throw new ErrorResponse('Course not added', 500)

    return ApiResponse.created({}).send(res)
})
export const courses = asyncHandler(async (req, res) => {
    console.log(req.user)
    const courses = await Course.find()
        .populate('teacher')
        .populate({
            path: 'standard',
            populate: {
                path: 'board',
            },
        })
        .sort({ createdAt: -1 })
    return ApiResponse.success(courses).send(res)
})
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedCourse = await Course.findByIdAndDelete(id)
    if (!deletedCourse) throw new ErrorResponse('Course not deleted', 500)
    return ApiResponse.success({}, 'Course deleted successfully').send(res)
})
export const singleCourse = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const course = await Course.find({ slug }).populate('teacher').populate('standard')
    if (!course) throw new ErrorResponse('Course not found', 404)
    return ApiResponse.success({ course }).send(res)
})
export const editCourse = asyncHandler(async (req, res) => {})
