import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@Schema()
export class Idea {
  @Prop()
  content: string;

  @Prop()
  username: string;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
