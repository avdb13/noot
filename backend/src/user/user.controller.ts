import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async get() {
    return await this.userService.findAll();
  }

  @Post('user')
  async create(@Body() user: RegisterUserDto) {
    return await this.userService.create(user).catch((e) => {
      throw new HttpException(
        {
          message: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
