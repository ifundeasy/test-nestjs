import {
  Req,
  Request,
  Get,
  Post,
  Controller,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { JwtAuthGuard, AdminGuard } from '../auth';
import { SoldProductService } from './sold-product.service';
import { ISoldProduct, IWarrantyClaim } from './sold-product.interface';
import { UserService } from 'src/user';
import { ProductService } from 'src/product';
import { WarrantyClaimStatus } from './sold-product.schema';

@Controller('sales')
export class SoldProductController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly soldProductService: SoldProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('collection')
  async registerMyCollection(@Req() req: Request): Promise<ISoldProduct> {
    try {
      const {
        user: { username },
        body: { productId, buyTimestamp },
      } = req as any;

      const product = await this.productService.getProduct({ code: productId });
      if (!product) throw new Error('Product not found');

      const buyer = await this.userService.get({ username });
      const soldProduct = await this.soldProductService.createSoldProduct({
        saleId: uuid(),
        buyer,
        product,
        buyTimestamp,
        warrantyClaims: [],
      });

      return soldProduct;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('collection/:saleId?')
  async getMyCollection(@Req() req: Request): Promise<ISoldProduct[]> {
    try {
      const {
        user: { username },
        params: { saleId },
      } = req as any;

      const query = {
        'buyer.username': username,
      } as any;
      if (saleId) query.saleId = saleId;

      const soldProduct = await this.soldProductService.getAllSoldProducts(
        query,
      );

      return soldProduct;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('warranty-claim/:saleId')
  async addWarrantyClaim(@Req() req: Request): Promise<ISoldProduct> {
    try {
      const {
        user: { username },
        params: { saleId },
      } = req as any;

      let soldItem = await this.soldProductService.getSoldProduct({ saleId });
      if (!soldItem || soldItem.buyer.username !== username) {
        throw new Error('Product sales not found');
      }

      const newStatus = {
        status: WarrantyClaimStatus.Pending,
      } as IWarrantyClaim;
      soldItem.warrantyClaims.push(newStatus);
      soldItem = await soldItem.save();

      return soldItem;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(AdminGuard(true))
  @Get('user-collection/:saleId?')
  async getAllClaims(@Req() req: Request): Promise<ISoldProduct[]> {
    try {
      const {
        params: { saleId },
      } = req as any;

      const query = {} as any;
      if (saleId) query.saleId = saleId;

      const soldProducts = await this.soldProductService.getAllSoldProducts(
        query,
      );
      if (!soldProducts) {
        throw new Error('Product sales not found');
      }
      return soldProducts;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(AdminGuard(true))
  @Post('user-claim/:saleId/:value')
  async claimReturn(@Req() req: Request): Promise<ISoldProduct> {
    try {
      const {
        params: { saleId, value },
      } = req as any;

      const newFlag = value as number;
      WarrantyClaimStatus.Delivered as number;

      if (newFlag < 1 || newFlag > (WarrantyClaimStatus.Delivered as number)) {
        throw new Error('Claim return value is out of range');
      }
      let soldItem = await this.soldProductService.getSoldProduct({ saleId });
      if (!soldItem) throw new Error('Product sales not found');

      const newStatus = {
        status: WarrantyClaimStatus[WarrantyClaimStatus[newFlag] as string],
      } as IWarrantyClaim;
      soldItem.warrantyClaims.push(newStatus);
      soldItem = await soldItem.save();

      return soldItem;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
