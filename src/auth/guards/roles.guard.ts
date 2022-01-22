import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "../../user/enum/role.enum";
import { UserEntity } from "../../user/entities/user.entity";


@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger: Logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.get<RoleEnum[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    if (!user)
      return false;
    return Object.values(requireRoles).includes(user.role);
  }

}