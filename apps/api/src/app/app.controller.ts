import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';

import { Message } from '@base-system/api-interfaces';

import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
