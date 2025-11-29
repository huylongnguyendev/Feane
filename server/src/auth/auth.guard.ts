import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Observable } from "rxjs"
import { JwtConstant } from "./constant.js"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers["authorization"]

    const [bearer, token] = authHeader && authHeader.split(" ") || []

    if (bearer !== "Bearer" || !token)
      throw new UnauthorizedException("Token không hợp lệ hoặc đã hết hạn")

    try {
      const payload = await this.jwt.verify(token, {
        secret: JwtConstant.secret
      })
      request.user = payload
      return true
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException("Token không hợp lệ hoặc đã hết hạn")
    }
  }
}