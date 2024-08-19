import { Game } from '@/games/model/game.model';
import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'game_id', async: true })
export class GameIdValidator {
  async validate(value: any) {
    const game = await Game.findByPk(value);
    if (!game) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'Game tidak ditemukan';
  }
}
