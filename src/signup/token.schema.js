import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true
    }
});

export default TokenSchema