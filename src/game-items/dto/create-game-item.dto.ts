import { Game } from '@/games/model/game.model';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';

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

  @ValidateNested({
    message: 'Game tidak valid',
  })
  @Type(() => Game)
  @ApiProperty()
  game_id: number;
}
