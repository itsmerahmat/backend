import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
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
import { User } from './user.decorator';

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

  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @Patch()
  update(@User('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @Delete()
  remove(@User('id') userId: string) {
    return this.usersService.remove(userId);
  }
}
