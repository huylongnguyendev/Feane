import { Module } from "@nestjs/common"
import { CategoryService } from "./category.service.js"
import { CategoryController } from "./category.controller.js"
import { APP_GUARD } from "@nestjs/core"
import { AuthGuard } from "../auth/auth.guard.js"

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
