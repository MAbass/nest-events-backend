import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CaslAbilityFactory } from "../auth/casl-ability.factory";
import { AuthorizationService } from "../auth/authorization.service";
import { UserService } from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Event, UserEntity])],
  controllers: [EventsController],
  providers: [EventsService, CaslAbilityFactory, AuthorizationService, UserService]
})
export class EventsModule {
}
