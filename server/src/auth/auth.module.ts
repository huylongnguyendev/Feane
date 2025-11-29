import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service.js"
import { AuthController } from "./auth.controller.js"
import { JwtModule } from "@nestjs/jwt"
import { JwtConstant } from "./constant.js"

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: JwtConstant.secret,
    signOptions: { expiresIn: "1m" },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
