import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  passwordhash: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
