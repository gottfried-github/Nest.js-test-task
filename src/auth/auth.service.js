import crypto from 'crypto'
import { Injectable, Dependencies } from '@nestjs/common';
import {getModelToken} from '@nestjs/mongoose'

function isEqualHash(salt, hash, password) {
    const _hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    // note point 5. in notes
    return crypto.timingSafeEqual(_hash, hash)
}

@Injectable()
@Dependencies(getModelToken('user'))
export class AuthService {
    constructor(userModel) {
        this.userModel = userModel
    }

    async validateUser(username, password) {
        const userDoc = await this.userModel.findOne({email: username})

        if (!userDoc) return null

        if (!userDoc.verified) return null

        if (!isEqualHash(userDoc.salt, userDoc.hash, password)) return null

        return {id: userDoc._id, email: userDoc.email}
    }
}
