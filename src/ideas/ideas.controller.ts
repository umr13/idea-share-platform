import { Body, Controller, Post } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { IdeasService } from './ideas.service';

@Controller('idea')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post('create')
  create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }
}
