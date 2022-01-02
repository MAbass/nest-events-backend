import { IsDateString, Length } from "class-validator";

export class CreateEventDto {
  @Length(4, 10, { message: "The name length is superior to 4 and inferior to 10" })
  name: string;
  @Length(10, 255)
  description: string;
  @IsDateString()
  when: Date;
  @Length(5, 255)
  address: string;
}
