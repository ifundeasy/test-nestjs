import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IUser, UserLoginDTO, UserService } from '../user';
import { ISession } from './auth.interface';
import { Session } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<ISession>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: UserLoginDTO): Promise<IUser> {
    const user = await this.userService.get({ username: data.username });
    if (!user) return null;

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      // TODO: save to session store
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
