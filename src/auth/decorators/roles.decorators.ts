import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../../user/enum/role.enum";

export const RolesDecorators = (...roles: RoleEnum[]) => SetMetadata("roles", roles);