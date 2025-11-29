import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module.js"
import { AuthModule } from "./auth/auth.module.js"
import { CategoryModule } from "./category/category.module.js"

@Module({
  imports: [PrismaModule, AuthModule, CategoryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
