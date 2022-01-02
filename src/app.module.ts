import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "./events/events.module";
import ormOptionsDev from "./config/orm.config.dev";
import ormConfigProd from "./config/orm.config.prod";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [ormOptionsDev],
    expandVariables: true
  }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV == "prod" ? ormConfigProd : ormOptionsDev
    }), EventsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
