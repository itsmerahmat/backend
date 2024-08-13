import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameItemsService } from './game-items.service';
import { CreateGameItemDto } from './dto/create-game-item.dto';
import { UpdateGameItemDto } from './dto/update-game-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/roles/roles.guard';
import { Role } from '@/roles/role.enum';
import { Roles } from '@/roles/roles.decorator';

@ApiTags('game-items')
@Controller('game-items')
export class GameItemsController {
  constructor(private readonly gameItemsService: GameItemsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createGameItemDto: CreateGameItemDto) {
    return this.gameItemsService.create(createGameItemDto);
  }

  @Get()
  findAll() {
    return this.gameItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameItemsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameItemDto: UpdateGameItemDto,
  ) {
    return this.gameItemsService.update(+id, updateGameItemDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameItemsService.remove(+id);
  }
}
