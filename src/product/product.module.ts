import { Module } from '@nestjs/common';

import { UserModule } from '../user';
import { AuthModule } from '../auth';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
// import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    UserModule,
  ],
  providers: [ProductService],
  // controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
