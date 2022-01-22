import { Event } from "../events/entities/event.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { ObjectsEntity } from "../adminconfig/entities/objects.entity";
import { PermissionsEntity } from "../adminconfig/entities/permissions.entity";

export default function ormOptionsProd(): TypeOrmModuleOptions {
  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Event, UserEntity, ObjectsEntity, PermissionsEntity],
    synchronize: false
  };
};