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
      username: this.usersConstants.getUserName(),
      likes: 0,
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
      this.updateLikes(likeIdeaDto, true);
      console.debug(`${action} \n created!`);
      return 'Idea Liked!';
    }
    this.updateLikes(likeIdeaDto, false);
    return 'Idea unliked!';
  }

  async updateLikes(likeIdeaDto: LikeIdeaDto, increment: boolean) {
    const idea = await this.ideaModel.findOne({ _id: `${likeIdeaDto.ideaId}` });

    let newLikeValue: number = idea['likes'];

    console.debug(`old like value is => ${newLikeValue}`);
    if (increment) {
      newLikeValue = idea.likes + 1;
    } else {
      newLikeValue = idea.likes - 1;
    }

    console.debug(`the new like value is: ${newLikeValue}`);

    await this.ideaModel.findOneAndUpdate(
      { _id: `${likeIdeaDto.ideaId}` },
      { likes: newLikeValue },
      { new: true },
    );
  }

  async comment(createCommentDto: CreateCommentDto): Promise<String> {
    await new this.ideaCommentModel({
      ideaId: createCommentDto.ideaId,
      comment: createCommentDto.comment,
      username: this.usersConstants.getUserName(),
    } as IdeaComment).save();

    return 'Commented successfully!';
  }
  async findTopIdea(x: string): Promise<IdeaDocument> {
    console.debug(`Args: ${x}`);
    const foo = await this.ideaModel.findOne({ _id: `${x}` });
    console.debug(`from db: ${foo}`);
    return foo;
  }
}
