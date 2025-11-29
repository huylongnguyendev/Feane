import "dotenv/config"
import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service.js"
import { RegisterDto } from "./dto/create-auth.dto.js"
import { LoginDto } from "./dto/login-auth.dto.js"
import type { Request, Response } from "express"
import { JwtConstant } from "./constant.js"
import { AuthGuard } from "./auth.guard.js"

const env = process.env.ENV

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post("register")
  register(@Body() data: RegisterDto): Promise<any> {
    return this.auth.register(data)
  }

  @Post("login")
  async login(@Body() data: LoginDto, @Res() res: Response): Promise<any> {
    const { accessToken, refreshToken } = await this.auth.login(data)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: env === "production",
      sameSite: env === "production" ? "strict" : "none",
      maxAge: JwtConstant.maxAgeSecret
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env === "production",
      sameSite: env === "production" ? "strict" : "none",
      maxAge: JwtConstant.maxAgeRefresh
    })

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken
    })
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: env === "production" ? "strict" : "none",
      path: "/"
    })

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: env === "production" ? "strict" : "none",
      path: "/"
    })

    await this.auth.logout(req)
    return res.status(204).send()
  }
}
