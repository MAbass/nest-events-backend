import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RoleEnum } from "./enum/role.enum";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto, role: RoleEnum) {
    this.logger.debug(`Trying to save user: ${createUserDto}`);
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

  findOne(id: number) {
    return this.userRepository.find({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
