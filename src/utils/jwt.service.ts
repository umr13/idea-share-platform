import { Injectable, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class PlatformJwtService {
  constructor(private jwtService: JwtService) {}

  async genJwtToken(user: UserDocument) {
    const payload = {
      username: user?.username,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
