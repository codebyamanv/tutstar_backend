import { Schema, model } from 'mongoose'

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        overview: {
            type: [String],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: [String],
        },
        description_2: {
            type: [String],
        },
        image: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
        },
        batches: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        standard: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Course = model('Course', courseSchema)
export default Course
