import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { IdeasService } from './ideas.service';
import { AuthGuard } from 'src/utils/platform-jwt.guard';
import { IdeaInterceptor } from 'src/interceptors/idea.interceptor';

@Controller('idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(IdeaInterceptor)
  create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }
}
