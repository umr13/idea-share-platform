import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';

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
  @Transform((params: any) => sanitizeHtml(params.value)) //broken import
  picture: string;
}
