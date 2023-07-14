import path from 'path'
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../public'),
            serveStaticOptions: {
                index: false
            }
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
