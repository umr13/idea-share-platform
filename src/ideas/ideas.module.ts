import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schema/ideas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class IdeasModule {}
