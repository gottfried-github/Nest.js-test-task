import path from 'path'
import { Controller, Dependencies, Get, Post, UseGuards, UseInterceptors, Bind, Request, Response, Body, Query, UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
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
        return res.sendFile(path.resolve(__dirname, '../public/dashboard.html'))
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
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {dest: path.resolve(__dirname, '../public/uploads')}))
    @Bind(Request(), UploadedFile())
    async upload(req, file) {
        return await this.appService.update(
            req.user.id, 
            null, 
            {avatarPath: path.join('/', path.relative(path.resolve(__dirname, '../public'), file.path))}
        )
    }

    @Get('list')
    async list() {
        return await this.appService.list()
    }
}
