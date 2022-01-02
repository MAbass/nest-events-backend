import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3406,
    username:"abass",
    password:"abass",
    database:"nest-events",
    synchronize:true
  }), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
