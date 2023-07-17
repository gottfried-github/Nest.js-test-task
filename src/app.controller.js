import path from 'path'
import { Controller, Dependencies, Get, Post, UseGuards, Bind, Request, Response, Body, Query } from '@nestjs/common';
import { AppService } from './app.service'
import {AuthenticatedGuard} from './auth/auth.authenticated-guard'

@Controller()
@UseGuards(AuthenticatedGuard)
@Dependencies(AppService)
export class AppController {
    constructor(appService) {
        this.appService = appService;
    }

    @Get()
    @Bind(Response())
    index(res) {
        return res.sendFile(path.resolve(__dirname, '../public/index.html'))
    }

    @Get('get')
    @Bind(Request({passthrough: true}))
    async get(req) {
        return await this.appService.get(req.user.id)
    }

    @Post('update')
    @Bind(Request(), Body())
    async update(req, body) {
        return await this.appService.update(req.user.id, body.password || null, body.fields || null)
    }

    @Get('list')
    async list() {
        return await this.appService.list()
    }
}
