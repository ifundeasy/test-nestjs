import {
  Req,
  Request,
  Get,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:code?')
  async myProduct(@Req() req: Request): Promise<IProduct[]> {
    try {
      const {
        params: { code },
      } = req as any;

      const query = {} as any;
      if (code) query.code = code;

      const soldProduct = await this.productService.getAllProducts(query);

      return soldProduct;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
