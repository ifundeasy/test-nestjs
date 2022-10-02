import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema()
export class Product {
  @Prop({ unique: true, index: true, required: true })
  code: string;

  @Prop({ index: true, required: true })
  name: string;

  @Prop({ default: 1, required: true })
  warranty: number; // in year

  @Prop({ required: true })
  price: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
