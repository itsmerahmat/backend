import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateGameDto {
  @IsString({
    message: 'Judul harus berupa string',
  })
  @MinLength(5, {
    message: 'Judul minimal 5 karakter',
  })
  @IsNotEmpty({
    message: 'Judul tidak boleh kosong',
  })
  @ApiProperty()
  title: string;

  @ApiProperty()
  image_url: string;
}
