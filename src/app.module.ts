import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "./events/events.module";
import ormConfigDev from "./config/orm.config.dev";
import ormConfigProd from "./config/orm.config.prod";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [ormConfigDev],
    expandVariables: true
  }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV == "prod" ? ormConfigProd : ormConfigDev
    }), EventsModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
