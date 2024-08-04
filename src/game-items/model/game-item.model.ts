import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Game } from '@/games/model/game.model';
import { Order } from '@/orders/model/order.model';

@Table({
  tableName: 'game_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class GameItem extends Model<GameItem> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  game_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @BelongsTo(() => Game)
  game: Game;

  @HasMany(() => Order)
  orders: Order[];
}
