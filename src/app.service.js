import { Injectable, Dependencies } from '@nestjs/common'
import {getModelToken} from '@nestjs/mongoose'

@Injectable()
@Dependencies(getModelToken('user'))
export class AppService {
    constructor(userModel) {
        this.userModel = userModel
    }

    getUser(id) {
        
    }
}
