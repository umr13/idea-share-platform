import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/auth-login.dto';
import { PlatformJwtService } from 'src/utils/jwt.service';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private platformJwtService: PlatformJwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByUsername(signInDto.username);
    if (!user) throw new UnauthorizedException();

    if (await this.isPasswordWrong(signInDto, user))
      throw new UnauthorizedException();

    return this.platformJwtService.genJwtToken(user);
  }

  async isPasswordWrong(
    signInDto: SignInDto,
    user: UserDocument,
  ): Promise<Boolean> {
    return !(await bcrypt.compare(signInDto.password, user?.passwordhash));
  }
}
