import Session from '../models/session.model.js'
import User from '../models/user.model.js'
import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import { generateSessionToken } from '../utils/sessionUtils.js'

export const register = asyncHandler(async (req, res) => {
    const { fullname, email, password, phone, standard } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (user) {
        throw new ErrorResponse('Email Already registered', 400, 'UserAlreadyExistsError')
    }
    await User.create({
        fullname,
        email,
        password,
        phone,
        standard,
    })
    return ApiResponse.created({}, 'User registered successfully').send(res)
})
export const login = asyncHandler(async (req, res) => {
    const { body } = req
    const user = await User.findOne({ email: body.email.toLowerCase() })
    if (!user) {
        throw new ErrorResponse('Invalid credentials', 401, 'InvalidCredentialsError')
    }
    const isPasswordCorrect = await user.isPasswordCorrect(body.password)
    if (!isPasswordCorrect) {
        throw new ErrorResponse('Invalid credentials', 401, 'InvalidCredentialsError')
    }

    const sessionToken = generateSessionToken()

    const allSessions = await Session.find({ userId: user._id })
    if (allSessions.length > 1) {
        await allSessions[0].deleteOne()
    }
    await Session.create({
        userId: user._id,
        token: sessionToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    res.cookie('sessionToken', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        // domain: '.tutstar.com',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return ApiResponse.success({ sessionToken }, 'Login successful').send(res)
})
export const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('standard')
    return ApiResponse.success(user).send(res)
})

export const logout = asyncHandler(async (req, res) => {
    const sessionToken = req.cookies.sessionToken
    await Session.deleteOne({ token: sessionToken })
    res.clearCookie('sessionToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        // domain: '.tutstar.com',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return ApiResponse.success({}, 'Logout successful').send(res)
})

export const update = asyncHandler(async (req, res) => {
    const { body } = req
    await User.findOneAndUpdate({ _id: req.user._id }, body, {
        new: true,
    })
    return ApiResponse.success({}, 'User updated successfully').send(res)
})
export const deleteUser = asyncHandler(async (req, res) => {})
export const forgotPassword = asyncHandler(async (req, res) => {})
export const resetPassword = asyncHandler(async (req, res) => {})
export const users = asyncHandler(async (req, res) => {
    const { query } = req
    const { page = 1, limit = 10 } = query
    const totalDocs = await User.countDocuments({ role: { $ne: 'admin' } })
    const totalPages = Math.ceil(totalDocs / limit)
    const skip = (page - 1) * limit
    const users = await User.find({ role: { $ne: 'admin' } })
        .skip(skip)
        .limit(limit)
    return ApiResponse.success({ users, totalPages }).send(res)
})

export const user = asyncHandler(async (req, res) => {
    const { params } = req
    const user = await User.findOne({ _id: params.id })
    if (!user) {
        throw new ErrorResponse('Invalid user', 404, 'UserNotFoundError')
    }
    return ApiResponse.success({ user }).send(res)
})
