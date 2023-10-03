import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!(await this.doesConfirmPasswordMatch(createUserDto))) {
      throw new UnauthorizedException();
    } else if (!(await this.doesUserExist(createUserDto))) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      createUserDto.id = uuidv4();

      const createdUser = await new this.userModel(createUserDto).save();

      const payload = {
        username: createdUser.username,
        sub: createdUser.id,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async doesUserExist(user: CreateUserDto): Promise<true | false> {
    if (
      (await this.userModel.findOne({ username: user.username })) != null ||
      (await this.userModel.findOne({ username: user.email })) != null
    ) {
      return true;
    }
    return false;
  }

  async doesConfirmPasswordMatch(user: CreateUserDto): Promise<true | false> {
    if ((await user.password) == user.confirmpassword) return true;
    return false;
  }
}
