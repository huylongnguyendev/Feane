import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service.js"
import { RegisterDto } from "./dto/create-auth.dto.js"
import { hash, compare } from "bcrypt"
import { Role } from "@prisma/client"
import { LoginDto } from "./dto/login-auth.dto.js"
import { JwtService } from "@nestjs/jwt"
import { JwtConstant } from "./constant.js"
import type { Request } from "express"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) { }

  async register(dataUser: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: dataUser.username ? dataUser.username : undefined },
          { email: dataUser.email ? dataUser.email : undefined },
          { phone: dataUser.phone ? dataUser.phone : undefined },
        ].filter(Boolean) as any
      }
    })

    if (user)
      throw new HttpException({ message: "Tài khoản đã tồn tại" }, HttpStatus.CONFLICT)

    const role: Role = !dataUser.role || dataUser.role === "CUSTOMER"
      ? Role.CUSTOMER
      : dataUser.role === "ADMIN"
        ? Role.ADMIN
        : Role.STAFF

    const hashPassword = await hash(dataUser.password, 12)

    await this.prisma.user.create({
      data: { ...dataUser, password: hashPassword, role }
    })

    throw new HttpException({ message: "Đăng ký tài khoản thành công" }, HttpStatus.CREATED)
  }

  async login(dataUser: LoginDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: dataUser.username ? dataUser.username : undefined },
          { phone: dataUser.phone ? dataUser.phone : undefined },
        ].filter(Boolean) as any
      }
    })

    if (!user)
      throw new HttpException({ message: "Tên tài khoản hoặc Mật khẩu không đúng" }, HttpStatus.UNAUTHORIZED)

    const isCorrectPassword = await compare(dataUser.password, user.password)

    if (!isCorrectPassword)
      throw new HttpException({ message: "Tên tài khoản hoặc Mật khẩu không đúng" }, HttpStatus.UNAUTHORIZED)

    const payload: Record<string, string> = { sub: user.id, username: user.username }

    const accessToken = await this.jwt.signAsync(payload, {
      secret: JwtConstant.secret,
      expiresIn: "1m"
    })

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: JwtConstant.refresh,
      expiresIn: "1m"
    })

    const session = await this.prisma.session.findUnique({
      where: {
        userId: user.id
      }
    })

    if (session)
      await this.prisma.session.update({
        where: { id: session.id },
        data: { ...session, refreshToken }
      })
    else
      await this.prisma.session.create({
        data: { userId: user.id, refreshToken }
      })

    return { accessToken, refreshToken }
  }

  async logout(req: Request): Promise<any> {
    const userId = (req as any).user.sub

    await this.prisma.session.delete({
      where: { userId },
    })
  }
}
