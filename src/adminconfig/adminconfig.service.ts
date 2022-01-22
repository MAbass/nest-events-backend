import { Injectable, Logger } from "@nestjs/common";
import { CreateObjectDto } from "./dto/create-object.dto";
import { SubjectEntity } from "./entities/subject.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateObjectPermissionDto } from "./dto/create-object-permission-dto";
import { PermissionsEntity } from "./entities/permissions.entity";
import { EntityNotFoundException } from "../exceptions/entity-not-found-exception";
import { UserPermissionsDto } from "./entities/user.permissions.dto";
import { UserEntity } from "../user/entities/user.entity";
import { RoleDto } from "./dto/role.dto";
import { RoleEntity } from "./entities/role.entity";
import { RolePermissionDto } from "./dto/role.permission.dto";
import { PermissionAction } from "../auth/enum/permission.action";
import { RoleUserDto } from "./dto/role.user.dto";

@Injectable()
export class AdminConfigService {
  private readonly logger: Logger = new Logger();

  constructor(@InjectRepository(PermissionsEntity) private readonly permissionsEntityRepository: Repository<PermissionsEntity>,
              @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
              @InjectRepository(SubjectEntity) private readonly subjectEntityRepository: Repository<SubjectEntity>,
              @InjectRepository(RoleEntity) private readonly roleEntityRepository: Repository<RoleEntity>) {
  }

  async createObject(createObjectDto: CreateObjectDto) {
    return await this.subjectEntityRepository.save(createObjectDto);
  }

  findAll() {
    return `This action returns all adminconfig`;
  }

  async createObjectPermission(createObjectPermissionDto: CreateObjectPermissionDto) {
    const object: SubjectEntity = await this.subjectEntityRepository.findOne({ name: createObjectPermissionDto.nameObject });
    if (!object)
      throw new EntityNotFoundException("Object");
    const permission: PermissionsEntity = new PermissionsEntity();
    permission.action = createObjectPermissionDto.action;
    permission.subject = object;
    return this.permissionsEntityRepository.save(permission);

  }

  async createUserPermissions(userPermissionsDtoList: UserPermissionsDto[], id: number) {
    let permissions: Array<PermissionsEntity> = [];
    const user: UserEntity = await this.userEntityRepository.findOne({ id: id });
    if (!user)
      throw new EntityNotFoundException(`user with id: ${id}`);
    for (const userPermission of userPermissionsDtoList) {
      const object: SubjectEntity = await this.subjectEntityRepository.findOne({ name: userPermission.entity });
      if (!object)
        throw new EntityNotFoundException(`object with name: ${userPermission.entity}`);
      const permission: PermissionsEntity = await this.permissionsEntityRepository.findOne({
        subject: object,
        action: userPermission.action
      });
      if (!permission)
        throw new EntityNotFoundException(`action with name:${userPermission.action}`);
      permissions.push(permission);
    }
    // user.permissions = permissions;
    // return this.userEntityRepository.save(user);
    return null;
  }

  async createRoleName(roleDto: RoleDto) {
    return this.roleEntityRepository.save(roleDto);
  }

  async addPermissionsToRole(rolePermissionDto: RolePermissionDto) {
    const permissions: PermissionsEntity[] = [];
    const role: RoleEntity = await this.roleEntityRepository.findOne({ name: rolePermissionDto.roleName });
    if (!role)
      throw new EntityNotFoundException(`role name: ${rolePermissionDto.roleName}`);
    for (const permission of rolePermissionDto.permissions) {
      const subject: SubjectEntity = await this.subjectEntityRepository.findOne({ name: permission.subject });
      if (!subject)
        throw new EntityNotFoundException(`subject name: ${permission.subject}`);
      const permissionFound: PermissionsEntity = await this.permissionsEntityRepository.findOne({
        subject: subject,
        action: <PermissionAction>permission.nameAction
      });
      if (!permissionFound)
        throw new EntityNotFoundException(`permission with name: ${permission.subject} and action: ${permission.nameAction} `);
      permissions.push(permissionFound);
    }
    role.permissions = permissions;
    return this.roleEntityRepository.save(role);
  }

  async addRoleToUser(roleUserDto: RoleUserDto) {
    const roles: RoleEntity[] = [];
    const user: UserEntity = await this.userEntityRepository.findOne({ username: roleUserDto.username });
    if (!user)
      throw new EntityNotFoundException(`user with username: ${roleUserDto.username} `);
    for (const role of roleUserDto.roles) {
      const roleFound: RoleEntity = await this.roleEntityRepository.findOne({ name: role });
      if (!roleFound)
        throw new EntityNotFoundException(`role with name: ${role}`);
      roles.push(roleFound);
    }
    user.roles = roles;
    return this.userEntityRepository.save(user);
  }
}

