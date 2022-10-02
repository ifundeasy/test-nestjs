import { Module } from '@nestjs/common';

import { UserModule } from '../user';
import { AuthModule } from '../auth';
import { ProductModule } from '../product';
import { SoldProduct, SoldProductSchema } from './sold-product.schema';
import { SoldProductService } from './sold-product.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { SoldProductController } from './sold-product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoldProduct.name, schema: SoldProductSchema },
    ]),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [SoldProductService],
  // controllers: [SoldProductController],
  exports: [SoldProductService],
})
export class SoldProductModule {}
