import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class RoleUserDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiModelProperty()
  @IsArray()
  @IsNotEmpty()
  roles: Array<string>;
}