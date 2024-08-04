import { Injectable } from '@nestjs/common';
import { CreateGameItemDto } from './dto/create-game-item.dto';
import { UpdateGameItemDto } from './dto/update-game-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GameItem } from './model/game-item.model';

@Injectable()
export class GameItemsService {
  constructor(
    @InjectModel(GameItem)
    private readonly gameItemModel: typeof GameItem,
  ) {}

  create(createGameItemDto: CreateGameItemDto): Promise<GameItem> {
    return this.gameItemModel.create(createGameItemDto);
  }

  findAll(): Promise<GameItem[]> {
    return this.gameItemModel.findAll();
  }

  findOne(id: number): Promise<GameItem> {
    return this.gameItemModel.findOne({ where: { id } });
  }

  update(
    id: number,
    updateGameItemDto: UpdateGameItemDto,
  ): Promise<[number, GameItem[]]> {
    return this.gameItemModel.update(updateGameItemDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number): Promise<number> {
    return this.gameItemModel.destroy({ where: { id } });
  }
}
