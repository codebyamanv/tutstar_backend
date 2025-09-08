import { Schema, model } from 'mongoose'

const classSchema = new Schema(
    {
        class: {
            type: Number,
            required: true,
        },
        classStream: {
            type: String,
        },
        board: {
            type: Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Class = model('Class', classSchema)
export default Class
