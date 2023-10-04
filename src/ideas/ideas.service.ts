import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Idea, IdeaDocument } from './schema/ideas.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeasService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>) {}

  async create(createIdeaDto: CreateIdeaDto): Promise<String> {
    const createdIdea = await new this.ideaModel({
      content: createIdeaDto.postContent,
      username: createIdeaDto.username,
    } as Idea).save();

    return 'Idea Post created successfully!';
  }
}
