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

@ApiTags('game-items')
@Controller('game-items')
export class GameItemsController {
  constructor(private readonly gameItemsService: GameItemsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameItemDto: UpdateGameItemDto,
  ) {
    return this.gameItemsService.update(+id, updateGameItemDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameItemsService.remove(+id);
  }
}
