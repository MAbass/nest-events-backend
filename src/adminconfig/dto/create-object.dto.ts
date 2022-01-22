import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsString, Length } from "class-validator";

export class CreateObjectDto {
  @ApiModelProperty()
  @IsString()
  @Length(4, 20)
  name: string;
}