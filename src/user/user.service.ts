import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser, IUserWithPassword } from './user.interface';
import { User } from './user.schema';
import { UserCreateDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async create(data: UserCreateDTO): Promise<IUser> {
    data.password = await bcrypt.hash(data.password, 10);

    const newUser = await this.userModel.create(data);
    return newUser as IUser;
  }

  async getCredential(query: object): Promise<IUserWithPassword> {
    return this.userModel.findOne(query);
  }

  async get(query: object): Promise<IUser> {
    return this.userModel.findOne(query);
  }
}
