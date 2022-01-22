import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsString } from "class-validator";
import { PermissionAction } from "../../auth/enum/permission.action";

export class CreateObjectPermissionDto {
  @ApiModelProperty()
  @IsString()
  action: PermissionAction;
  @ApiModelProperty()
  @IsString()
  nameObject: string;
}