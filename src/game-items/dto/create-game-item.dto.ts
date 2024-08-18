import { GameIdValidator } from '@/validators/GameIfExists.validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateGameItemDto {
  @IsString({
    message: 'Judul harus berupa string',
  })
  @MinLength(2, {
    message: 'Judul minimal 2 karakter',
  })
  @IsNotEmpty({
    message: 'Judul tidak boleh kosong',
  })
  @ApiProperty()
  title: string;

  @IsNotEmpty({
    message: 'Harga tidak boleh kosong',
  })
  @IsInt({
    message: 'Harga harus berupa angka',
  })
  @ApiProperty()
  price: number;

  @IsString({
    message: 'Deskripsi harus berupa string',
  })
  @ApiProperty()
  description: string;

  @ApiProperty()
  image_url: string;

  @Validate(GameIdValidator)
  @ApiProperty()
  game_id: number;
}
