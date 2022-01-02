import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import AuthService from "./auth.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(LocalStrategy.name);

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username: username });
    if (!user) {
      this.logger.debug("User:" + username + " is not found");
      throw new UnauthorizedException();
    }
    if (!await bcrypt.compare(password, user.password)) {
      this.logger.debug("invalid password for user:" + username);
      throw new UnauthorizedException();
    }
    return user;
  }
}