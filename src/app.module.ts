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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        dialect: 'mysql',
        models: [User, Game, GameItem, Order],
        // autoLoadModels: true,
        ...(configService.get('DATABASE_URL')
          ? { uri: configService.get('DATABASE_URL') }
          : {
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABASE'),
            }),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          transport: {
            // host: configService.get('SMTP_HOST'),
            // port: configService.get('SMTP_PORT'),
            // secure: false,
            service: 'gmail',
            auth: {
              user: configService.get('SMTP_USER'),
              pass: configService.get('SMTP_PASS'),
            },
          },
          defaults: {
            from: '"No Reply" <jordirwn@gmail.com>',
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    GamesModule,
    GameItemsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
