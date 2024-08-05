import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  findOne(id: string) {
    return this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({ where: { username } });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
