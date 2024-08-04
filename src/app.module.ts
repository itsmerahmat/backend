import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { GameItemsModule } from './game-items/game-items.module';
import { OrdersModule } from './orders/orders.module';
import { User } from './users/model/user.model';
import { Game } from './games/model/game.model';
import { GameItem } from './game-items/model/game-item.model';
import { Order } from './orders/model/order.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gameshop',
      models: [User, Game, GameItem, Order],
      // autoLoadModels: true,
    }),
    UsersModule,
    GamesModule,
    GameItemsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
