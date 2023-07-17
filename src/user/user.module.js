import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import {SignupService} from '../signup/signup.service'
import { UserService } from './user.service';
import { UserController } from './user.controller';
import TokenSchema from '../signup/token.schema'
import {UserSchema} from '../schemas.js'
import {MailService} from '../mail/mail.service'
import {MailModule} from '../mail/mail.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MailModule,
  ],
  providers: [UserService, SignupService, MailService],
  controllers: [UserController]
})
export class UserModule {}
