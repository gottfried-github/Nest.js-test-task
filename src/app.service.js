import { Injectable, Dependencies } from '@nestjs/common'
import {SignupService} from './signup/signup.service'

@Injectable()
@Dependencies(SignupService)
export class AppService {
    constructor(signupService) {
        this.signupService = signupService
    }

    signup() {
        return this.signupService.signup()
    }

    verify(token) {
        return this.signupService.verify(token)
    }
}
