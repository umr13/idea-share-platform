import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { IdeasService } from './ideas.service';
import { AuthGuard } from 'src/utils/platform-jwt.guard';
import { LikeIdeaDto } from './dto/like-idea.dto';
import { CreateCommentDto } from './dto/comment-idea.dto';

@Controller('idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }

  @UseGuards(AuthGuard)
  @Get('posts')
  fetchIdeas() {
    return this.ideasService.fetchIdeas();
  }

  @UseGuards(AuthGuard)
  @Get('idealikes')
  fetchIdeaLikes() {
    return this.ideasService.fetchIdeaLikes();
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  comment(@Body() createCommentDto: CreateCommentDto) {
    return this.ideasService.comment(createCommentDto);
  }

  @UseGuards(AuthGuard)
  @Post('likeunlike')
  likeIdea(@Body() likeIdeaDto: LikeIdeaDto) {
    return this.ideasService.likeIdea(likeIdeaDto);
  }
}
