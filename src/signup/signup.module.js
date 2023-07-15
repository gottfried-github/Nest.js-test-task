import { Module } from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {MailModule} from '../mail/mail.module'
import {MailService} from '../mail/mail.service'
import {SignupService} from './signup.service'
import TokenSchema from './token.schema'

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }]),
  ],
  providers: [MailService, SignupService]
})
export class SignupModule {}
