import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PlatformJwtService } from 'src/utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private platformJwtService: PlatformJwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (this.checkIfConfirmPasswordIsWrong(createUserDto))
      throw new UnauthorizedException();

    if (await this.doesUserExist(createUserDto))
      throw new UnauthorizedException();

    let hashedPassword = await this.hashUserPassword(createUserDto);

    const createdUser = await new this.userModel({
      email: createUserDto.email,
      passwordhash: hashedPassword,
      name: createUserDto.name,
      username: createUserDto.username,
      picture: createUserDto.picture,
    } as User).save();

    return this.platformJwtService.genJwtToken(createdUser);
  }

  async findByUsername(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async doesUserExist(user: CreateUserDto): Promise<true | false> {
    if (
      //or opperator in mongos, promise.all
      (await this.userModel.findOne({ username: user.username })) != null ||
      (await this.userModel.findOne({ email: user.email })) != null
    ) {
      return true;
    }
    return false;
  }

  private checkIfConfirmPasswordIsWrong(user: CreateUserDto) {
    if (user.password != user.confirmpassword) return true;
    return false;
  }

  async hashUserPassword(createUserDto: CreateUserDto): Promise<String> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(createUserDto.password, salt);
  }
}
