import { Body, Controller, Delete, Get, Patch, Post, Res, UseGuards } from "@nestjs/common"
import { CategoryService } from "./category.service.js"
import { Category } from "@prisma/client"
import { UpdateCategoryDto } from "./dto/update-category.dto.js"
import type { Response } from "express"
import { RoleEnum, Roles } from "../decorators/roles.decorator.js"
import { CreateCategoryDto } from "./dto/create-category.dto.js"
import { AuthGuard } from "../auth/auth.guard.js"
import { RolesGuard } from "../guards/roles.guard.js"

@Controller("category")
export class CategoryController {
  constructor(private readonly category: CategoryService) { }

  @Get()
  async getAllCat(): Promise<Category[]> {
    return await this.category.getAll()
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.STAFF])
  async createCat(@Body() data: CreateCategoryDto, @Res() res: Response): Promise<any> {
    const created = await this.category.create(data)

    return res.status(201).json({
      message: "Thêm loại hàng thành công",
      created
    })
  }

  @Patch()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.STAFF])
  async updateCat(@Body() data: UpdateCategoryDto, @Res() res: Response): Promise<any> {
    const updated = await this.category.update(data)
    return res.status(201).json({
      message: "Cập nhật loại thành công",
      updated
    })
  }

  @Delete()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.STAFF])
  async deleteOneCat(@Body() id: string, @Res() res: Response): Promise<any> {
    await this.category.deleteOne(id)
    return res.status(201).json({ message: "Xóa loại thành công" })
  }

  @Delete()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADMIN, RoleEnum.STAFF])
  async deleteManyCat(@Body() ids: string[], @Res() res: Response): Promise<any> {
    await this.category.deleteMany(ids)
    return res.status(201).json({ message: "Xóa loại thành công" })
  }
}
