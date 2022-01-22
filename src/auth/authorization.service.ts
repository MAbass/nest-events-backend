import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthorizationService {
  constructor(private readonly userService: UserService) {
  }

  async findAllPermissionsOfUser(user: UserEntity): Promise<any> {
    return await this.userService.findAllPermissionsOfUser(user);
  }
}