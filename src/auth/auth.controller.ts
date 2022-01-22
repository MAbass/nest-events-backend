import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import AuthenticationService from "./authentication.service";
import { CurrentUser } from "./decorators/current-user.decorators";
import { UserEntity } from "../user/entities/user.entity";
import { AuthGuardJwt } from "./guards/auth.guard.jwt";
import { AuthGuardLocal } from "./guards/auth.guard.local";

@Controller("/api")
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @Post("login")
  @UseGuards(AuthGuardLocal)
  public async login(@CurrentUser() user: UserEntity) {
    return { userId: user.id, token: this.authService.getTokenForUser(user) };
  }

  @Get("profile")
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: UserEntity) {
    return user;
  }

}