import crypto from 'crypto'
import { Injectable, Dependencies } from '@nestjs/common';
import {getModelToken} from '@nestjs/mongoose'
import {MailService} from '../mail/mail.service'

@Injectable()
@Dependencies(getModelToken('token'), MailService)
export class SignupService {
    constructor(tokenModel, mailService) {
        this.tokenModel = tokenModel
        this.mailService = mailService
    }

    async signup() {
        const token = crypto.randomBytes(20).toString('hex')

        const tokenDoc = new this.tokenModel({token})
        const res = await tokenDoc.save()

        const response = await this.mailService.sendMessage({
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
