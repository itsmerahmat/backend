import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { GameItem } from '@/game-items/model/game-item.model';

@Table({
  tableName: 'games',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Game extends Model<Game> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @HasMany(() => GameItem)
  items: GameItem[];
}
