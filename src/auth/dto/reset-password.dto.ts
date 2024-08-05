import { ApiProperty } from '@nestjs/swagger';
import {
  IsJWT,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export default class ResetPasswordDto {
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

  @IsJWT()
  @ApiProperty()
  token: string;
}
