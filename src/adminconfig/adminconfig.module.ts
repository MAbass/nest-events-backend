import { Module } from "@nestjs/common";
import { AdminConfigService } from "./adminconfig.service";
import { AdminConfigController } from "./adminconfig.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubjectEntity } from "./entities/subject.entity";
import { PermissionsEntity } from "./entities/permissions.entity";
import { UserEntity } from "../user/entities/user.entity";
import { RoleEntity } from "./entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity, PermissionsEntity, UserEntity, RoleEntity])],
  controllers: [AdminConfigController],
  providers: [AdminConfigService]
  
})
export class AdminConfigModule {
}
