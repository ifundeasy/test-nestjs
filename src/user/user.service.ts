import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserWithPassword } from './user.interface';
import { UserCreateDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<IUser>) {}

  async create(data: UserCreateDTO): Promise<IUser> {
    const newUser = await this.userModel.create(data);
    return newUser as IUser;
  }

  async get(query: object): Promise<IUserWithPassword> {
    return this.userModel.findOne(query);
  }
}
