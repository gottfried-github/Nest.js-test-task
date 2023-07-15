import { Module } from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {MailModule} from '../mail/mail.module'
import {MailService} from '../mail/mail.service'
import {SignupService} from './signup.service'
import TokenSchema from './token.schema'
import {UserSchema} from '../schemas'

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [MailService, SignupService]
})
export class SignupModule {}
