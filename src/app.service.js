import { Injectable } from '@nestjs/common';
import sendMessage from './email.js'

@Injectable()
export class AppService {
    async signup() {
        const response = await sendMessage({
            from: 'dannvx@gmail.com',
            sender: 'dannvx@gmail.com',
            to: 'tobetodee@gmail.com',
            subject: 'spdload test email',
            text: 'hello world'
        })

        return response
    }
}
