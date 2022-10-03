import { Document } from 'mongoose';
import { IProduct } from '../product';
import { IUser } from '../user';
import { WarrantyClaimStatus } from './sold-product.schema';

export interface IWarrantyClaim extends Document {
  readonly status: WarrantyClaimStatus;
  readonly createdAt: Date;
}

export interface ISoldProduct extends Document {
  readonly saleId: string;
  readonly product: IProduct;
  readonly buyer: IUser;
  readonly warrantyClaims: IWarrantyClaim[];
  readonly buyTimestamp: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
