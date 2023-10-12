import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schema/ideas.schema';
import { UsersConstants } from 'src/users/user.constants';
import { LikedIdea, LikedIdeaSchema } from './schema/like.idea.schema';
import { IdeaComment, IdeaCommentSchema } from './schema/idea.comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
    MongooseModule.forFeature([{ name: LikedIdea.name, schema: LikedIdeaSchema }]),
    MongooseModule.forFeature([{ name: IdeaComment.name, schema: IdeaCommentSchema }]),
  ],
  controllers: [IdeasController],
  providers: [IdeasService, UsersConstants],
})
export class IdeasModule {}
