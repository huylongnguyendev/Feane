import { $Enums } from "@prisma/client"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator"

export class RegisterDto {
  @IsNotEmpty({message: "Tên tài khoản không được để trống"})
  @IsString({ message: "Tên tài khoản không hợp lệ" })
  @MinLength(6, { message: "Tên tài khoản phải có ít nhất 6 ký tự" })
  username!: string

  @IsEmail({}, { message: "Email không hợp lệ" })
  email?: string

  @IsNotEmpty({message: "Số điện thoại không được để trống"})
  @IsPhoneNumber("VN", { message: "Số điện thoại không hợp lệ" })
  phone!: string

  @IsNotEmpty({message: "Mật khẩu không được để trống"})
  @MinLength(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  password!: string

  @IsNotEmpty({message: "Tên không được để trống"})
  @IsString({ message: "Tên không hợp lệ" })
  @MinLength(3, { message: "Tên phải có ít nhất 3 ký tự" })
  fullName!: string

  role?: $Enums.Role
}