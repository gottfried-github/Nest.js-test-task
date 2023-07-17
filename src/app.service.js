import { Injectable, Dependencies } from '@nestjs/common'
import {getModelToken} from '@nestjs/mongoose'
import generateHash from './helpers'

@Injectable()
@Dependencies(getModelToken('user'))
export class AppService {
    constructor(userModel) {
        this.userModel = userModel
    }

    get(id) {
        return this.userModel.findById(id)
    }

    async update(id, password, fields) {
        console.log('AppService, update - fields:', fields)

        fields = fields || {}

        if (password) {
            const hash = generateHash(password)

            fields.salt = hash.salt
            fields.hash = hash.hash
        }

        const res = await this.userModel.updateOne({_id: id}, fields)

        const doc = await this.userModel.findById(id)

        return {
            email: doc.email,
            avatarPath: doc.avatarPath
        }
    }

    list() {
        return this.userModel.find()
    }
}
