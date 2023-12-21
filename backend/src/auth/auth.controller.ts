import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, UserInfoDto } from '../user/user.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request,
    @Body() userDto: LoginUserDto,
  ): Promise<UserInfoDto> {
    const user = await this.authService.login(userDto.id, userDto.password);

    req.session.user = user.id;
    const { id: _id, password: _password, isActive: _isActive, ...rest } = user;
    console.log(rest);

    return rest;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.session.user;
  }
}
