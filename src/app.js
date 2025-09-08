import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import asyncHandler from './utils/asyncHandler.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import baseRouter from './routes/base.routes.js'
import userRouter from './routes/user.routes.js'
import classRouter from './routes/class.routes.js'
import boardRouter from './routes/board.routes.js'
import teacherRouter from './routes/teacher.routes.js'
import courseRouter from './routes/course.routes.js'
import zoomRoutes from './routes/zoom.routes.js'

const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
)
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use(cookieParser('Rent&RideVarkala-secret-key-protected'))

app.use('/', baseRouter)
app.use('/api/users', userRouter)
app.use('/api/classes', classRouter)
app.use('/api/boards', boardRouter)
app.use('/api/teachers', teacherRouter)
app.use('/api/courses', courseRouter)
app.use('/api/zoom', zoomRoutes)

app.all(
    '/*catchAll',
    asyncHandler(async (req, res, next) => {
        const error = new Error(`Route ${req.originalUrl} not found`)
        error.statusCode = 404
        next(error)
    }),
)

app.use(globalErrorHandler)
export { app }
