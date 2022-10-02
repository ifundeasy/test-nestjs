import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { Product, ProductSchema } from '../product';
import { User, UserSchema } from '../user';

export enum WarrantyClaimStatus {
  Pending,
  Accepted,
  Refused,
  Delivered,
}

@Schema()
export class WarrantyClaim {
  @Prop({
    type: String,
    enum: WarrantyClaimStatus,
    default: WarrantyClaimStatus.Pending,
  })
  status: WarrantyClaimStatus;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const WarrantyClaimSchema = SchemaFactory.createForClass(WarrantyClaim);

@Schema()
export class SoldProduct {
  @Prop({ unique: true, index: true, required: true })
  saleId: string;

  @Prop({ type: ProductSchema, required: true })
  product: Product;

  @Prop({ type: UserSchema, required: true })
  buyer: User;

  @Prop({ type: [WarrantyClaimSchema] })
  warrantyClaims: WarrantyClaim[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SoldProductSchema = SchemaFactory.createForClass(SoldProduct);
