import { Injectable, Dependencies } from '@nestjs/common';
import {getModelToken} from '@nestjs/mongoose'
import {MailService} from '../mail/mail.service'
import generateHash from '../helpers.js'

@Injectable()
@Dependencies(getModelToken('token'), getModelToken('user'), MailService)
export class SignupService {
    constructor(tokenModel, userModel, mailService) {
        this.tokenModel = tokenModel
        this.userModel = userModel
        this.mailService = mailService
    }

    async signup(email, password) {
        /* create the user */
        const userDoc = new this.userModel({
            email, 
            ...generateHash(password), 
            verified: false
        })

        const userRes = await userDoc.save()

        /* create the verification token */
        const token = crypto.randomBytes(20).toString('hex')

        const tokenDoc = new this.tokenModel({
            userId: userRes._id,
            token
        })
        const tokenRes = await tokenDoc.save()

        /* send the email */
        const response = await this.mailService.sendMessage({
            from: 'dannvx@gmail.com',
            sender: 'dannvx@gmail.com',
            to: email,
            subject: 'spdload test email',
            textEncoding: 'base64',
            html: `<p>Hi! Follow the following link to verify your email: <a href='localhost:3000/verification?token=${token}'>localhost:3000/verification?token=${token}</a><p>`,
        })

        return response
    }

    async verify(token) {
        const tokenDoc = await this.tokenModel.findOne({token})

        if (null === tokenDoc) return {
            result: false,
            message: "the token doesn't exist"
        }

        const userDoc = await this.userModel.findById(tokenDoc.userId)

        if (null === userDoc) return {
            result: false,
            message: "user, associated with the token doesn't exist"
        }

        userDoc.verified = true

        const userRes = await userDoc.save()
        const tokenRes = await this.tokenModel.deleteOne(tokenDoc._id)

        return {
            result: true,
            message: "successfully verified the user"
        }
    }
}
