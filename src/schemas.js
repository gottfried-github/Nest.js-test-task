import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: mongoose.Schema.Types.Buffer,
        required: true
    },
    salt: {
        type: mongoose.Schema.Types.Buffer,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    avatarPath: {
        type: String
    }
})

export {UserSchema}