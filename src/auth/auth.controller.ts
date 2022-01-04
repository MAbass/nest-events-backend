import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import AuthService from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorators";
import { User } from "../user/entities/user.entity";
import { AuthGuardJwt } from "./guards/auth.guard.jwt";
import { AuthGuardLocal } from "./guards/auth.guard.local";

@Controller("/api")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("login")
  @UseGuards(AuthGuardLocal)
  public async login(@CurrentUser() user: User) {
    return { userId: user.id, token: this.authService.getTokenForUser(user) };
  }

  @Get("profile")
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

}