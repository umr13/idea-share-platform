import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  confirmpassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //@Transform((params: TransformFnParams) => sanitizeHtml(params.value)) //broken import
  picture: string;
}
