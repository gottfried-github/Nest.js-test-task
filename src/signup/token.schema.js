import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    token: {
        type: String,
        required: true,
        index: true
    }
});

export default TokenSchema