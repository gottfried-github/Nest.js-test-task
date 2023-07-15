import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

export default TokenSchema