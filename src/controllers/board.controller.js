import fs from 'node:fs'
import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import Board from '../models/board.model.js'

export const addBoard = asyncHandler(async (req, res) => {
    const { body } = req
    const file = req.file
    if (!file) {
        return res.status(400).json({ error: 'License file is required' })
    }
    const imagePath = file.path.replace(/\\/g, '/')
    const imageURL = `${req.protocol}://${req.get('host')}/${imagePath}`
    const newBoard = await Board.create({
        ...body,
        image: imageURL,
        imagePath,
    })
    if (!newBoard) throw new ErrorResponse('Board not added', 500)
    return ApiResponse.created({}, 'Board added successfully').send(res)
})
export const deleteBoard = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedBoard = await Board.findByIdAndDelete(id)
    if (deletedBoard?.imagePath) {
        const imagePath = deletedBoard?.imagePath.replace(/\\/g, '/')
        fs?.unlinkSync(imagePath)
    }
    if (!deletedBoard) throw new ErrorResponse('Board not deleted', 500)
    return ApiResponse.success({}, 'Board deleted successfully').send(res)
})
export const boards = asyncHandler(async (req, res) => {
    const boards = await Board.find().sort({ createdAt: -1 })
    return ApiResponse.success(boards, 'Boards fetch successfully').send(res)
})
export const singleBoard = asyncHandler(async (req, res) => {})
export const editBoard = asyncHandler(async (req, res) => {})
