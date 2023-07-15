import crypto from 'crypto'
import { Injectable, Dependencies } from '@nestjs/common'
import {getModelToken} from '@nestjs/mongoose'
import sendMessage from './email.js'

@Injectable()
@Dependencies(getModelToken('token'))
export class AppService {
    constructor(tokenModel) {
        this.tokenModel = tokenModel
        console.log("AppService constructor, tokenModel:", tokenModel)
    }

    async signup() {
        const token = crypto.randomBytes(20).toString('hex')

        const tokenDoc = new this.tokenModel({token})
        await tokenDoc.save()

        const response = await sendMessage({
            from: 'dannvx@gmail.com',
            sender: 'dannvx@gmail.com',
            to: 'tobetodee@gmail.com',
            subject: 'spdload test email',
            textEncoding: 'base64',
            html: `<p>Hi! Follow the following link to verify your email: <a href='localhost:3000/verification?token=${token}'>localhost:3000/verification?token=${token}</a><p>`,
        })

        return response
    }

    async verify(token) {
        const tokenDoc = await this.tokenModel.findOne({token})

        return tokenDoc
    }
}
