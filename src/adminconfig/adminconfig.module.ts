import { Module } from "@nestjs/common";
import { AdminConfigService } from "./adminconfig.service";
import { AdminConfigController } from "./adminconfig.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObjectsEntity } from "./entities/objects.entity";
import { PermissionsEntity } from "./entities/permissions.entity";
import { UserEntity } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ObjectsEntity, PermissionsEntity, UserEntity])],
  controllers: [AdminConfigController],
  providers: [AdminConfigService]
  
})
export class AdminConfigModule {
}
