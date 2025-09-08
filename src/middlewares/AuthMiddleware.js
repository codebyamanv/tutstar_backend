import Session from '../models/session.model.js'
import User from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'

export const accessController = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        let sessionToken

        if (req.cookies && req.cookies.sessionToken) {
            sessionToken = req.cookies.sessionToken
        } else if (req.headers.authorization) {
            const authHeader = req.headers.authorization

            if (authHeader.startsWith('Bearer ')) {
                sessionToken = authHeader.substring(7)
            } else {
                sessionToken = authHeader
            }
        }

        if (!sessionToken) {
            res.clearCookie('sessionToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                // domain: '.tutstar.com',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return next(new ErrorResponse('Authentication required', 401, 'CookieNotFoundError'))
        }

        const session = await Session.findOne({ token: sessionToken })

        if (!session) {
            res.clearCookie('sessionToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                // domain: '.tutstar.com',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return next(
                new ErrorResponse(
                    'Invalid session. Please log in again',
                    401,
                    'InvalidSessionError',
                ),
            )
        }

        if (session.expiresAt < new Date()) {
            await Session.deleteOne({ _id: session._id })
            res.clearCookie('sessionToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                // domain: '.tutstar.com',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return next(
                new ErrorResponse(
                    'Your session has expired. Please log in again',
                    401,
                    'SessionExpiredError',
                ),
            )
        }

        

        const user = await User.findById(session.userId).select('-password')

        if (!user) {
            res.clearCookie('sessionToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                // domain: '.tutstar.com',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return next(new ErrorResponse('User not found', 404))
        }

        if (!allowedRoles.includes(user.role)) {
            return next(new ErrorResponse('Access denied. Insufficient permissions', 403))
        }

        req.user = user
        next()
    })
}
