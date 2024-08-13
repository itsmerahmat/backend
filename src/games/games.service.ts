import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './model/game.model';
import { UploadService } from '@/upload/upload.service';
import { basename } from 'path';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game)
    private readonly gameModel: typeof Game,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createGameDto: CreateGameDto,
    image_url: Express.Multer.File,
  ): Promise<Game> {
    if (typeof image_url === 'object') {
      createGameDto.image_url = this.uploadService.getFileUrl(
        image_url.filename,
      );
    }
    return this.gameModel.create(createGameDto);
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  async findOne(id: number): Promise<Game> {
    return this.gameModel.findOne({ include: { all: true }, where: { id } });
  }

  async update(
    id: number,
    updateGameDto: UpdateGameDto,
    image_url: Express.Multer.File,
  ) {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (image_url) {
      const oldImagePath = game.image_url;
      if (oldImagePath) {
        const oldImageName = basename(oldImagePath);
        this.uploadService.deleteFile(oldImageName);
      }
      updateGameDto.image_url = this.uploadService.getFileUrl(
        image_url.filename,
      );
    }
    return this.gameModel.update(updateGameDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    const game = await this.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const oldImagePath = game.image_url;
    if (oldImagePath) {
      const oldImageName = basename(oldImagePath);
      this.uploadService.deleteFile(oldImageName);
    }
    return this.gameModel.destroy({ where: { id } });
  }
}
