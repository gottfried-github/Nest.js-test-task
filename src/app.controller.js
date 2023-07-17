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
}
