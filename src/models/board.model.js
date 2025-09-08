import { Schema, model } from 'mongoose'

const boardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Board = model('Board', boardSchema)
export default Board
