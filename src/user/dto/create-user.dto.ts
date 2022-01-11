import { IsEmail, IsString, Length } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  @Length(4,40)
  username: string;
  @ApiModelProperty()
  @IsString()
  @Length(4,40)
  firstname: string;
  @ApiModelProperty()
  @IsString()
  @Length(4,40)
  lastname: string;
  @ApiModelProperty()
  @IsEmail()
  email: string;
  @ApiModelProperty()
  @IsString()
  @Length(4,40)
  password: string;
}
