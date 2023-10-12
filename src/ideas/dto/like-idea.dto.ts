import { ApiProperty } from '@nestjs/swagger';

export class LikeIdeaDto {
  @ApiProperty()
  ideaId: string;
}
