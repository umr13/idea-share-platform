import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  ideaId: string;
  @ApiProperty()
  comment: string;
}
