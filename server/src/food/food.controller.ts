import { Controller } from "@nestjs/common"
import { FoodService } from "./food.service.js"

@Controller("food")
export class FoodController {
  constructor(private readonly food: FoodService) {}

  
}
