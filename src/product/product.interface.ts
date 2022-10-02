import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly name: string;
  readonly warranty: number;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
