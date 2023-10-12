import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikedIdeaDocument = HydratedDocument<LikedIdea>;

@Schema()
export class LikedIdea {
  @Prop()
  ideaId: string;

  @Prop()
  username: string;
}

export const LikedIdeaSchema = SchemaFactory.createForClass(LikedIdea);
