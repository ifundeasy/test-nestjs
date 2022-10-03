import { Injectable } from '@nestjs/common';
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
    query: object,
    updateProductDto: SoldProductUpdateDTO,
  ): Promise<ISoldProduct> {
    const existingProduct = await this.soldProductModel.findOneAndUpdate(
      query,
      updateProductDto,
      { new: true },
    );
    return existingProduct;
  }

  async getAllSoldProducts(query: object): Promise<ISoldProduct[]> {
    const productData = await this.soldProductModel.find(query);
    return productData;
  }

  async getSoldProduct(query: object): Promise<ISoldProduct> {
    const existingProduct = await this.soldProductModel.findOne(query).exec();
    return existingProduct;
  }

  async deleteSoldProduct(query: object): Promise<ISoldProduct> {
    const deletedProduct = await this.soldProductModel.findOneAndUpdate(query);
    return deletedProduct;
  }
}
