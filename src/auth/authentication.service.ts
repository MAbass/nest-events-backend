import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export default class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {
  }

  public getTokenForUser(user: UserEntity): string {
    return this.jwtService.sign({ username: user.username, sub: user.id });
  }

  public async hashPassword(password: string): Promise<any> {
    return await bcrypt.hash(password, 10);
  }
}