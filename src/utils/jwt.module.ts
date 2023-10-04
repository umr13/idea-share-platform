import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { PlatformJwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [PlatformJwtService],
  providers: [PlatformJwtService],
})
export class PlatformJwtModule {}
