import { Injectable, Logger, UseFilters } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { getConnection, Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RoleEnum } from "./enum/role.enum";
import { PermissionsEntity } from "../adminconfig/entities/permissions.entity";
import { TypeOrmExceptionFilter } from "../exceptions/type.orm.exception.filter";
import * as _ from "lodash";

@Injectable()
@UseFilters(new TypeOrmExceptionFilter())
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async create(createUserDto: CreateUserDto, role: RoleEnum) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userRepository.save({
      username: createUserDto.username,
      role: role,
      email: createUserDto.email,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      password: createUserDto.password
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findAllPermissionsOfUser(user: UserEntity) {
    const permissions: PermissionsEntity[] = [];
    const userFound: UserEntity = await getConnection()
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.roles", "userRoles")
      .innerJoinAndSelect("userRoles.permissions", "userRolesPermissions")
      .innerJoinAndSelect("userRolesPermissions.subject", "userRolesPermissionsSubject")
      .where("user.id = :id", { id: user.id })
      .getOne();
    for (const role of userFound.roles) {
      for (const permission of role.permissions) {
        permissions.push(permission);
      }
    }
    return _.uniqWith(permissions, _.isEqual);
  }
}
