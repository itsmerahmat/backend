import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './model/game.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game)
    private readonly gameModel: typeof Game,
  ) {}

  create(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameModel.create(createGameDto);
  }

  findAll(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  findOne(id: number): Promise<Game> {
    return this.gameModel.findOne({ where: { id } });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gameModel.update(updateGameDto, { where: { id } });
  }

  remove(id: number): Promise<number> {
    return this.gameModel.destroy({ where: { id } });
  }
}
