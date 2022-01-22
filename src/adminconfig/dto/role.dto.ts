import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class RoleDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}