import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateObjectDto } from "./dto/create-object.dto";
import { ObjectsEntity } from "./entities/objects.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Transaction } from "typeorm";
import { CreateObjectPermissionDto } from "./dto/create-object-permission-dto";
import { PermissionsEntity } from "./entities/permissions.entity";
import { EntityNotFoundException } from "../exceptions/entity-not-found-exception";
import { UserPermissionsDto } from "./entities/user.permissions.dto";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class AdminConfigService {
  private readonly logger: Logger = new Logger();

  constructor(@InjectRepository(ObjectsEntity) private readonly objectsEntityRepository: Repository<ObjectsEntity>,
              @InjectRepository(PermissionsEntity) private readonly permissionsEntityRepository: Repository<PermissionsEntity>,
              @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {
  }

  async createObject(createObjectDto: CreateObjectDto) {
    return await this.objectsEntityRepository.save(createObjectDto);
  }

  findAll() {
    return `This action returns all adminconfig`;
  }

  async createObjectPermission(createObjectPermissionDto: CreateObjectPermissionDto) {
    const object: ObjectsEntity = await this.objectsEntityRepository.findOne({ name: createObjectPermissionDto.nameObject });
    if (!object)
      throw new EntityNotFoundException("Object");
    const permission: PermissionsEntity = new PermissionsEntity();
    permission.action = createObjectPermissionDto.action;
    permission.object = object;
    return this.permissionsEntityRepository.save(permission);

  }

  async createUserPermissions(userPermissionsDtoList: UserPermissionsDto[], id: number) {
    let permissions: Array<PermissionsEntity> = [];
    const user: UserEntity = await this.userEntityRepository.findOne({ id: id });
    if (!user)
      throw new EntityNotFoundException(`user with id: ${id}`);
    for (const userPermission of userPermissionsDtoList) {
      const object: ObjectsEntity = await this.objectsEntityRepository.findOne({ name: userPermission.entity });
      if (!object)
        throw new EntityNotFoundException(`object with name: ${userPermission.entity}`);
      const permission: PermissionsEntity = await this.permissionsEntityRepository.findOne({
        object: object,
        action: userPermission.action
      });
      if (!permission)
        throw new EntityNotFoundException(`action with name:${userPermission.action}`);
      permissions.push(permission);
    }
    user.permissions = permissions;
    return this.userEntityRepository.save(user);
  }
}

