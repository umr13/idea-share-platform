import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants';
import { PlatformJwtService } from './utils.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  exports: [PlatformJwtService],
  providers: [PlatformJwtService],
})
export class PlatformJwtModule {}
