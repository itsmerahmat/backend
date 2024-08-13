import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import ForgotPasswordDto from './dto/forgot-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';

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
  async login(@Request() req) {
    return this.authService.login(req.user);
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
  async resetPassword(@Request() req, @Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(req.user.userId, body.password);
  }
}
