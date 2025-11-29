import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateFoodDto {
  @IsNotEmpty({message: "Tên sản phẩm không được để trống"})
  name!: string
  @IsNotEmpty({message: "Mô tả sản phẩm không được để trống"})
  description!: string
  @IsNotEmpty({ message: "Giá sản phẩm không được để trống" })
  @IsNumber({}, {message: "Giá sản phẩm phải là số"})
  origPrice!: number

  @IsNumber({}, {message: "Giảm giá sản phẩm phải là số"})
  discount?: number
  @IsNotEmpty({ message: "Số lượng sản phẩm không được để trống" })
  @IsNumber({}, {message: "Số lượng sản phẩm phải là số"})
  stockQty!: number

  @IsNotEmpty({message: "Loại sản phẩm không được để trống"})
  categoryId!: string
}