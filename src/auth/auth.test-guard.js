import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class TestGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest()
    console.log("TestGuard, request.user:", request.user)
    return true
  }
}