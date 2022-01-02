import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(4,40)
  username: string;
  @IsString()
  @Length(4,40)
  firstname: string;
  @IsString()
  @Length(4,40)
  lastname: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(4,40)
  password: string;
}
