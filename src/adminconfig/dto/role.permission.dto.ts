import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

interface PermissionDto {
  nameAction: string;
  subject: string;
}

export class RolePermissionDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;
  @ApiModelProperty()
  @IsArray()
  @IsNotEmpty()
  permissions: PermissionDto[];
}