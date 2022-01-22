import { Ability } from "@casl/ability";
import { AuthorizationService } from "./authorization.service";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import { PermissionsEntity } from "../adminconfig/entities/permissions.entity";
import { PermissionAction } from "./enum/permission.action";
import { CaslPermission } from "./interface/casl.permission";


export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly authorizationService: AuthorizationService) {
  }

  async createForUser(user: UserEntity): Promise<AppAbility> {
    const dbPermissions: PermissionsEntity[] = await this.authorizationService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
      action: p.action,
      subject: p.subject.name
    }));
    return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
  }
}