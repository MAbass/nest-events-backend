import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import AuthService from "./auth.service";
import { CurrentUser } from "./current-user.decorators";
import { User } from "../user/entities/user.entity";
import { AuthGuardJwt } from "./guard/auth.guard.jwt";
import { AuthGuardLocal } from "./guard/auth.guard.local";

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