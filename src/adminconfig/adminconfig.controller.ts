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
  ParseArrayPipe, UseGuards
} from "@nestjs/common";
import { AdminConfigService } from "./adminconfig.service";
import { CreateObjectDto } from "./dto/create-object.dto";
import { CreateObjectPermissionDto } from "./dto/create-object-permission-dto";
import { TypeOrmExceptionFilter } from "../exceptions/type.orm.exception.filter";
import { UserPermissionsDto } from "./entities/user.permissions.dto";
import { RoleDto } from "./dto/role.dto";
import { AuthGuardJwt } from "../auth/guards/auth.guard.jwt";
import { RolePermissionDto } from "./dto/role.permission.dto";
import { RoleUserDto } from "./dto/role.user.dto";

@Controller("api")
@UseFilters(new TypeOrmExceptionFilter())
@UseGuards(AuthGuardJwt)
export class AdminConfigController {
  constructor(private readonly adminConfigService: AdminConfigService) {
  }

  @Post("/createSubject")
  async createObject(@Body() createObjectDto: CreateObjectDto) {
    return this.adminConfigService.createObject(createObjectDto);
  }

  @Post("/subject/permissions/create")
  async createObjectPermissions(@Body() createObjectPermissionDto: CreateObjectPermissionDto) {
    return this.adminConfigService.createObjectPermission(createObjectPermissionDto);
  }

  @Post("/subject/permissions/:id/create")
  async createUserPermissions(@Body(ParseArrayPipe) userPermissionsDtoList: UserPermissionsDto[], @Param("id", ParseIntPipe) id: number) {
    return await this.adminConfigService.createUserPermissions(userPermissionsDtoList, id);
  }

  @Post("/role/create")
  async createARoleName(@Body() roleDto: RoleDto) {
    return await this.adminConfigService.createRoleName(roleDto);
  }

  @Post("/role/permissions/create")
  async addPermissionToRole(@Body() rolePermissionDto: RolePermissionDto) {
    return await this.adminConfigService.addPermissionsToRole(rolePermissionDto);
  }
  @Post("/role/user/create")
  async addRoleToUser(@Body() roleUserDto: RoleUserDto) {
    return await this.adminConfigService.addRoleToUser(roleUserDto);
  }


  @Get()
  findAll() {
    return this.adminConfigService.findAll();
  }

}
