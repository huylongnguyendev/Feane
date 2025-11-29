import { Reflector } from "@nestjs/core"

export enum RoleEnum {
  CUSTOMER = "CUSTOMER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export const Roles = Reflector.createDecorator<RoleEnum[]>()