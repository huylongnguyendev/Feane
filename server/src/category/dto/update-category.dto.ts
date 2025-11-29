import { IsNotEmpty } from "class-validator"

export class UpdateCategoryDto {
  @IsNotEmpty()
  id!: string
  @IsNotEmpty({ message: "Tên không được để trống" })
  name?: string
  @IsNotEmpty({ message: "Mô tả không được để trống" })
  description?: string
}