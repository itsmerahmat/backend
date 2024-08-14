import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/roles/roles.decorator';
import { Role } from '@/roles/role.enum';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/roles/roles.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Public)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.User)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.User)
  @ApiBearerAuth()
  @Patch()
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.userId, updateUserDto);
  }

  @Roles(Role.User)
  @ApiBearerAuth()
  @Delete()
  remove(@Req() req: any) {
    return this.usersService.remove(req.userId);
  }
}
