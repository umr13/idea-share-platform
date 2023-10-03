import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUsers: User) {
    const salt = await bcrypt.genSalt();
    createUsers.password = await bcrypt.hash(createUsers.password, salt);

    const createdUser = await new this.userModel(createUsers).save();

    const payload = {
      username: createdUser.username,
      sub: createdUser.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
