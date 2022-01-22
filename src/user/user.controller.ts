import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Logger,
  ValidationPipe, ParseIntPipe, UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RoleEnum } from "./enum/role.enum";
import { AuthGuardJwt } from "../auth/guards/auth.guard.jwt";

@Controller("api")
@UseGuards(AuthGuardJwt)
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
  }

  @Post("user")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, RoleEnum.USER);
  }
  @Post("object")
  createObject(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, RoleEnum.USER);
  }

  @Post("user/admin")
  createAdmin(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, RoleEnum.ADMIN);
  }


  @Get("user")
  findAll() {
    return this.userService.findAll();
  }

  /*@Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }*/
}
