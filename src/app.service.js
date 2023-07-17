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

    update(id, password, fields) {
        fields = fields || {}

        if (password) {
            const hash = generateHash(password)

            fields.salt = hash.salt
            fields.hash = hash.hash
        }

        return this.userModel.updateOne({_id: id}, fields)
    }

    list() {
        return this.userModel.find()
    }
}
