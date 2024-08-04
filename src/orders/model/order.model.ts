import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '@/users/model/user.model';
import { GameItem } from '@/game-items/model/game-item.model';

@Table({
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @ForeignKey(() => GameItem)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  game_item_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_price: number;

  @Column({
    type: DataType.ENUM('PENDING', 'SUKSES', 'GAGAL'),
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => GameItem)
  game_item: GameItem;
}
