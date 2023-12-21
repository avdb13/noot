import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(id: string, password: string): Promise<User> {
    const user = await this.userService.findOne(id);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException();
    }

    return user;
  }
  // @Post('user/login')
  // async login(@Body() user: LoginUserDto) {
  //   console.log('logging in user');
  //   jwt.sign;
  // }
}
