import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly username: string;
  readonly isAdmin: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IUserWithPassword extends IUser {
  password: string;
}
