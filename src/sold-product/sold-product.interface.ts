import { Document } from 'mongoose';
import { IProduct } from '../product';
import { IUser } from '../user';
import { WarrantyClaimStatus } from './sold-product.schema';

export interface IWarrantyClaim extends Document {
  readonly status: WarrantyClaimStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ISoldProduct extends Document {
  readonly product: IProduct;
  readonly buyer: IUser;
  readonly warrantyClaims: IWarrantyClaim[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
