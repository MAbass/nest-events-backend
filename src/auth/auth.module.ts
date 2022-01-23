import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import AuthenticationService from "./authentication.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { AuthorizationService } from "./authorization.service";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: "60m"
        }
      })
    })
  ],
  // providers: [LocalStrategy, JwtStrategy, AuthenticationService, { provide: APP_GUARD, useClass: RolesGuard }], //If we need to use the role guard to all of module.
  // Then we use only role decorators, not use guard because use guard is in all of endpoint
  providers: [LocalStrategy, JwtStrategy, AuthenticationService, CaslAbilityFactory, AuthorizationService, UserService],
  controllers: [AuthController]
})
export class AuthModule {
}
