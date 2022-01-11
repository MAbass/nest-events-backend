import { IsDateString, IsNumber, Length } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateEventDto {
  @ApiModelProperty()
  @Length(4, 255, { message: "The name length is superior to 4 and inferior to 10" })
  name: string;
  @ApiModelProperty()
  @Length(10, 255)
  description: string;
  @ApiModelProperty()
  @IsDateString()
  when: Date;
  @ApiModelProperty()
  @Length(5, 255)
  address: string;
  @ApiModelProperty()
  @IsNumber()
  userId: number;
}
