import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import ForgotPasswordDto from './dto/forgot-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { User } from '@/users/user.decorator';
import { IUserSafe } from '@/users/interfaces/user-safe.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'admin',
        },
        password: {
          type: 'string',
          example: 'admin',
        },
      },
    },
  })
  async login(@User() user: IUserSafe) {
    return this.authService.login(user);
  }

  @Post('local/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('local/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('local/reset-password')
  async resetPassword(
    @User('id') userId: string,
    @Body() body: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(userId, body.password);
  }
}
