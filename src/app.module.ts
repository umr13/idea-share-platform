import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IdeasModule } from './ideas/ideas.module';
import { PlatformJwtModule } from './utils/utils.module';
import { UsersConstants } from './users/user.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env/development.env' }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mytestdb.heiiv7a.mongodb.net/?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    IdeasModule,
    PlatformJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersConstants],
})
export class AppModule {}
