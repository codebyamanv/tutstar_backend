import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
const teacherSchema = new Schema(
    {
        role: {
            type: String,
            default: 'teacher',
        },
        fullname: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

teacherSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const Teacher = model('Teacher', teacherSchema)
export default Teacher
