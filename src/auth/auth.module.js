import { Module } from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import {UserSchema} from '../schemas'
import {SessionSerializer} from './session.serializer'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    PassportModule
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
