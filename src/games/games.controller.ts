import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/roles/roles.decorator';
import { Role } from '@/roles/role.enum';
import { RolesGuard } from '@/roles/roles.guard';
import { UploadInterceptor } from '@/upload/upload.interceptor';

@ApiTags('games')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(UploadInterceptor)
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createGameDto: CreateGameDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.gamesService.create(createGameDto, image_url);
  }

  @Roles(Role.Public)
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Roles(Role.Public)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(UploadInterceptor)
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
    @UploadedFile() image_url: Express.Multer.File,
  ) {
    return this.gamesService.update(+id, updateGameDto, image_url);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
