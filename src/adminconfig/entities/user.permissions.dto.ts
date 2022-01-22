import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsString } from "class-validator";
import { PermissionAction } from "../../auth/enum/permission.action";

export class UserPermissionsDto {
  @ApiModelProperty()
  @IsString()
  entity: string;

  @ApiModelProperty()
  @IsString()
  action: PermissionAction;

}