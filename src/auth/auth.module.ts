import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: "60m"
        }
      })
    })
  ],
  // providers: [LocalStrategy, JwtStrategy, AuthService, { provide: APP_GUARD, useClass: RolesGuard }], //If we need to use the role guard to all of module.
  // Then we use only role decorators, not use guard because use guard is in all of endpoint
  providers: [LocalStrategy, JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
