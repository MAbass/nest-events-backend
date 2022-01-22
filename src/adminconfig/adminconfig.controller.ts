import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  ParseArrayPipe
} from "@nestjs/common";
import { AdminConfigService } from "./adminconfig.service";
import { CreateObjectDto } from "./dto/create-object.dto";
import { CreateObjectPermissionDto } from "./dto/create-object-permission-dto";
import { TypeOrmExceptionFilter } from "../exceptions/type.orm.exception.filter";
import { UserPermissionsDto } from "./entities/user.permissions.dto";

@Controller("api")
@UseFilters(new TypeOrmExceptionFilter())
export class AdminConfigController {
  constructor(private readonly adminConfigService: AdminConfigService) {
  }

  @Post("/createObject")
  async createObject(@Body() createObjectDto: CreateObjectDto) {
    return this.adminConfigService.createObject(createObjectDto);
  }

  @Post("/object/permissions")
  async createObjectPermissions(@Body() createObjectPermissionDto: CreateObjectPermissionDto) {
    return this.adminConfigService.createObjectPermission(createObjectPermissionDto);
  }

  @Post("/object/permissions/:id")
  async createUserPermissions(@Body(ParseArrayPipe) userPermissionsDtoList: UserPermissionsDto[], @Param("id", ParseIntPipe) id: number) {
    return await this.adminConfigService.createUserPermissions(userPermissionsDtoList, id);
  }

  @Get()
  findAll() {
    return this.adminConfigService.findAll();
  }

}
