import { Module } from "@nestjs/common"
import { FoodService } from "./food.service.js"
import { FoodController } from "./food.controller.js"

@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
