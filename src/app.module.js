import path from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import {MongooseModule} from '@nestjs/mongoose'

import {MailService} from './mail/mail.service'
import {MailModule} from './mail/mail.module';
import TokenSchema from './signup/token.schema'
import {SignupService} from './signup/signup.service'
import {SignupModule} from './signup/signup.module';
import {AppService} from './app.service'
import {AppController} from './app.controller'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../public'),
            serveStaticOptions: {
                index: false
            }
        }),
        MongooseModule.forRoot(`mongodb://${process.env.APP_DB_USER}:${process.env.APP_DB_PASS}@${process.env.NET_NAME}/${process.env.APP_DB_NAME}`),
        MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }]),
        SignupModule,
        MailModule
    ],
    controllers: [AppController],
    providers: [MailService, SignupService, AppService],
})
export class AppModule {}
