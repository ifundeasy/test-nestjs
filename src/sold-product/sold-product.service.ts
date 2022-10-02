import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SoldProductCreateDTO, SoldProductUpdateDTO } from './sold-product.dto';
import { ISoldProduct } from './sold-product.interface';
import { SoldProduct } from './sold-product.schema';

@Injectable()
export class SoldProductService {
  constructor(
    @InjectModel(SoldProduct.name)
    private soldProductModel: Model<ISoldProduct>,
  ) {}

  async createSoldProduct(
    createSoldProductDto: SoldProductCreateDTO,
  ): Promise<ISoldProduct> {
    const newSoldProduct = await new this.soldProductModel(
      createSoldProductDto,
    );
    return newSoldProduct.save();
  }

  async updateSoldProduct(
    soldProductId: string,
    updateSoldProductDto: SoldProductUpdateDTO,
  ): Promise<ISoldProduct> {
    const existingSoldProduct = await this.soldProductModel.findByIdAndUpdate(
      soldProductId,
      updateSoldProductDto,
      { new: true },
    );
    if (!existingSoldProduct) {
      throw new NotFoundException(`SoldProduct #${soldProductId} not found`);
    }
    return existingSoldProduct;
  }

  async getAllSoldProducts(): Promise<ISoldProduct[]> {
    const soldProductData = await this.soldProductModel.find();
    if (!soldProductData || soldProductData.length == 0) {
      throw new NotFoundException('SoldProducts data not found!');
    }
    return soldProductData;
  }

  async getSoldProduct(soldProductId: string): Promise<ISoldProduct> {
    const existingSoldProduct = await this.soldProductModel
      .findById(soldProductId)
      .exec();
    if (!existingSoldProduct) {
      throw new NotFoundException(`SoldProduct #${soldProductId} not found`);
    }
    return existingSoldProduct;
  }

  async deleteSoldProduct(soldProductId: string): Promise<ISoldProduct> {
    const deletedSoldProduct = await this.soldProductModel.findByIdAndDelete(
      soldProductId,
    );
    if (!deletedSoldProduct) {
      throw new NotFoundException(`SoldProduct #${soldProductId} not found`);
    }
    return deletedSoldProduct;
  }
}
