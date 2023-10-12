import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikedIdeaDocument = HydratedDocument<IdeaComment>;

@Schema()
export class IdeaComment {
  @Prop()
  ideaId: string;

  @Prop()
  comment: string;

  @Prop()
  username: string;
}

export const IdeaCommentSchema = SchemaFactory.createForClass(IdeaComment);
