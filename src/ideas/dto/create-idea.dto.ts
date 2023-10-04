import { ApiProperty } from '@nestjs/swagger';

export class CreateIdeaDto {
  @ApiProperty()
  postContent: string;

  @ApiProperty()
  username: string;
}
