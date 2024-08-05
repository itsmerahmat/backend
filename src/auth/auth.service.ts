import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.dataValues;
      return result;
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async login(user: any) {
    return {
      access_token: await this.generateToken(user),
    };
  }

  async register(user: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    return this.usersService.create(Object.assign(user, { password: hash }));
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const mailInfo = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Reset Token',
        text: `Your password reset token is: ${await this.generateToken(user)}`,
      });
      return mailInfo;
    }
    return null;
  }

  async resetPassword(userId: any, password: string) {
    const user = await this.usersService.findOne(userId);
    if (user) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return this.usersService.update(user.id, { password: hash });
    }
    return null;
  }
}
