import { IsNotEmpty, IsPhoneNumber, IsString, MinLength, Validate, ValidateIf, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "UsernameOrPhoneConstraint", async: false })
class UsernameOrPhoneConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: any) {
    const obj = args.object
    return !!(obj.username || obj.phone)
  }

  defaultMessage(): string {
    return "Tên tài khoản hoặc Số điện thoại không được để trống"
  }
}

export class LoginDto {
  @ValidateIf(o => !o.phone)
  @IsString({ message: "Tên tài khoản không hợp lệ" })
  username!: string

  @ValidateIf(o => !o.username)
  @IsPhoneNumber("VN", { message: "Số điện thoại không hợp lệ" })
  phone!: string

  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  @MinLength(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  password!: string

  @Validate(UsernameOrPhoneConstraint)
  dummyField!: string
}