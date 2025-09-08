import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
            enum: ['admin', 'student', 'teacher'],
            default: 'student',
        },
        fullname: {
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
        dob: {
            type: Date,
        },
        standard: {
            type: Schema.Types.ObjectId,
            ref: 'Class',
        },
        avatar: {
            type: String,
            required: true,
            default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        },
        avatarPath: {
            type: String,
        },
        courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    },
    {
        timestamps: true,
    },
)

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)
export default User
