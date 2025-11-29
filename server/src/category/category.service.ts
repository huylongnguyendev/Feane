import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service.js"
import { Category } from "@prisma/client"
import { UpdateCategoryDto } from "./dto/update-category.dto.js"
import { CreateCategoryDto } from "./dto/create-category.dto.js"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<Category[]> {
    return await this.prisma.category.findMany()
  }

  async create(dataCat: CreateCategoryDto): Promise<any> {
    const category = await this.prisma.category.findFirst({
      where: { name: dataCat.name }
    })

    if (category)
      throw new HttpException({ message: "Loại hàng đã tồn tại" }, HttpStatus.CONFLICT)
    
    return await this.prisma.category.create({ data: dataCat })
  }

  async update(data: UpdateCategoryDto): Promise<Category> {
    const { id, ...updateData } = data
    const res = await this.prisma.category.update({
      where: { id: id },
      data: updateData
    })

    return res
  }

  async deleteOne(id: string) {
    await this.prisma.category.delete({
      where: { id }
    })
  }

  async deleteMany(ids: string[]) {
    await this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
