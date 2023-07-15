import path from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import TokenSchema from './token.schema'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../public'),
            serveStaticOptions: {
                index: false
            }
        }),
        MongooseModule.forRoot(`mongodb://${process.env.APP_DB_USER}:${process.env.APP_DB_PASS}@${process.env.NET_NAME}/${process.env.APP_DB_NAME}`),
        MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
