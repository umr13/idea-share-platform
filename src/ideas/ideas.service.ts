import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Idea, IdeaDocument } from './schema/ideas.schema';
import { Model } from 'mongoose';
import { LikeIdeaDto } from './dto/like-idea.dto';
import { UsersConstants } from 'src/users/user.constants';
import { LikedIdea, LikedIdeaDocument } from './schema/like.idea.schema';
import { CreateCommentDto } from './dto/comment-idea.dto';
import { IdeaComment } from './schema/idea.comment.schema';

@Injectable()
export class IdeasService {
  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
    @InjectModel(LikedIdea.name)
    private likeIdeaModel: Model<LikedIdeaDocument>,
    @InjectModel(IdeaComment.name)
    private ideaCommentModel: Model<LikedIdeaDocument>,
    private readonly usersConstants: UsersConstants,
  ) {}

  async create(createIdeaDto: CreateIdeaDto): Promise<String> {
    await new this.ideaModel({
      content: createIdeaDto.postContent,
      username: createIdeaDto.username,
    } as Idea).save();

    return 'Idea Post created successfully!';
  }

  async fetchIdeas(): Promise<String[]> {
    return await this.ideaModel.find();
  }

  async fetchIdeaLikes(): Promise<String[]> {
    return await this.likeIdeaModel.find();
  }

  async likeIdea(likeIdeaDto: LikeIdeaDto): Promise<String> {
    console.debug(this.usersConstants.getUserName());

    try {
      var action = await this.likeIdeaModel.findOneAndDelete({
        ideaId: `${likeIdeaDto.ideaId}`,
        username: `${this.usersConstants.getUserName()}`,
      });
      console.debug(`${action} \n deleted!`);
    } catch {
      console.debug('Entry did not exist');
    }

    if (action == null) {
      action = await new this.likeIdeaModel({
        ideaId: likeIdeaDto.ideaId,
        username: this.usersConstants.getUserName(),
      } as LikedIdea).save();

      console.debug(`${action} \n created!`);

      return 'Idea Liked!';
    }
    return 'Idea unliked!';
  }
  async comment(createCommentDto: CreateCommentDto): Promise<String> {
    await new this.ideaCommentModel({
      ideaId: createCommentDto.ideaId,
      comment: createCommentDto.comment,
      username: this.usersConstants.getUserName(),
    } as IdeaComment).save();

    return 'Idea Comment Post created successfully!';
  }
}
