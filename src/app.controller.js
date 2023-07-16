import path from 'path'
import { Controller, Dependencies, Get, Post, UseGuards, Bind, Request, Response, Body, Query } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AppService } from './app.service'
import {TestGuard} from './auth/auth.test-guard'
import {AuthenticatedGuard} from './auth/auth.authenticated-guard'

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

    @Get('verification')
    @Bind(Query('token'))
    async verify(token) {
        const res = await this.appService.verify(token)

        if (!res.result) return res.message

        // TODO: redirect to login page
        return res.message
    }

    @Get('login')
    @Bind(Response())
    getLogin(res) {
        return res.sendFile(path.resolve(__dirname, '../public/login.html'))
    }

    @Get('logout')
    @Bind(Request())
    logout(req) {
        req.logout(null, () => {})
        return true
    }

    @Post('signup')
    @Bind(Body())
    async signup(body) {
        console.log("POST signup, body:", body)
        return await this.appService.signup(body.email, body.password)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login() {
        return true
    }

    @UseGuards(TestGuard)
    @Get('test')
    test() {
        return true
    }

    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    protected() {
        return true
    }
}
