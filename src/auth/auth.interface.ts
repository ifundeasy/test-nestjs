import { Document } from 'mongoose';
import { IUser } from 'src/user';

export interface ISession extends Document {
  readonly accessToken: string;
  readonly expiresAt: Date;
  readonly user: IUser;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
