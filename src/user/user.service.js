import { Injectable, Dependencies } from '@nestjs/common'
import {SignupService} from '../signup/signup.service'

@Injectable()
@Dependencies(SignupService)
export class UserService {
    constructor(signupService) {
        this.signupService = signupService
    }

    signup(email, password) {
        return this.signupService.signup(email, password)
    }

    verify(token) {
        return this.signupService.verify(token)
    }
}
