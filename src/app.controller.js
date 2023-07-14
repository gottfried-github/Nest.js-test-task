import path from 'path'
import { Controller, Dependencies, Get, Post, Bind, Response, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    
    @Get('signup')
    @Bind(Response())
    getSignup(res) {
        return res.sendFile(path.resolve(__dirname, '../public/signup.html'))
    }

    @Post('signup')
    @Bind(Body())
    async signup(body) {
        console.log("POST signup, body:", body)
        return await this.appService.signup()
    }
}
