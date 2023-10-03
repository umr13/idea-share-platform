import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {


  @Prop()
  id: string;

  @ApiProperty()
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
