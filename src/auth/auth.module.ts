import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PlatformJwtModule } from 'src/utils/utils.module';

@Module({
  imports: [UsersModule, PlatformJwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
