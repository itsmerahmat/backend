import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Nama harus berupa string',
  })
  @MinLength(5, {
    message: 'Nama minimal 5 karakter',
  })
  @IsNotEmpty({
    message: 'Nama tidak boleh kosong',
  })
  @ApiProperty()
  name: string;

  @IsString({
    message: 'Username harus berupa string',
  })
  @MinLength(5, {
    message: 'Username minimal 5 karakter',
  })
  @IsNotEmpty({
    message: 'Username tidak boleh kosong',
  })
  @ApiProperty()
  username: string;

  @IsString({
    message: 'Email harus berupa string',
  })
  @IsNotEmpty({
    message: 'Email tidak boleh kosong',
  })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString({
    message: 'Password harus berupa string',
  })
  @MinLength(8, {
    message: 'Password minimal 8 karakter',
  })
  @IsNotEmpty({
    message: 'Password tidak boleh kosong',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password harus mengandung setidaknya 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 simbol',
    },
  )
  @ApiProperty()
  password: string;
}
