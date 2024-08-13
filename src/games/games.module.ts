import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './model/game.model';
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [SequelizeModule.forFeature([Game]), UploadModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
