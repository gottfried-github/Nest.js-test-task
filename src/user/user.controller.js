import path from 'path'
import { Controller, Dependencies, Get, Post, UseGuards, Bind, Request, Response, Body, Query } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { UserService } from './user.service'
import {AuthenticatedGuard} from '../auth/auth.authenticated-guard'

@Controller('user')
@Dependencies(UserService)
export class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    
    @Get('signup')
    @Bind(Response())
    getSignup(res) {
        return res.sendFile(path.resolve(__dirname, '../../public/signup.html'))
    }

    @Get('verification')
    @Bind(Query('token'))
    async verify(token) {
        const res = await this.useService.verify(token)

        if (!res.result) return res.message

        // TODO: redirect to login page
        return res.message
    }

    @Get('login')
    @Bind(Response())
    getLogin(res) {
        return res.sendFile(path.resolve(__dirname, '../../public/login.html'))
    }

    @UseGuards(AuthenticatedGuard)
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
        return await this.userService.signup(body.email, body.password)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login() {
        return true
    }

    @Get('test')
    @Bind(Request())
    test(req) {
        console.log("GET /test - req.user:", req.user)
        return true
    }

    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    protected() {
        return true
    }
}