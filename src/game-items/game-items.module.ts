import { Module } from '@nestjs/common';
import { GameItemsService } from './game-items.service';
import { GameItemsController } from './game-items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameItem } from './model/game-item.model';

@Module({
  imports: [SequelizeModule.forFeature([GameItem])],
  controllers: [GameItemsController],
  providers: [GameItemsService],
})
export class GameItemsModule {}
