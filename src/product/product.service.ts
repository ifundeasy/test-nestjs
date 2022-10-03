import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductCreateDTO, ProductUpdateDTO } from './product.dto';
import { IProduct } from './product.interface';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<IProduct>,
  ) {}

  async createProduct(createProductDto: ProductCreateDTO): Promise<IProduct> {
    const newProduct = await new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    query: object,
    updateProductDto: ProductUpdateDTO,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findOneAndUpdate(
      query,
      updateProductDto,
      { new: true },
    );
    return existingProduct;
  }

  async getAllProducts(query: object): Promise<IProduct[]> {
    const productData = await this.productModel.find(query);
    return productData;
  }

  async getProduct(query: object): Promise<IProduct> {
    const existingProduct = await this.productModel.findOne(query).exec();
    return existingProduct;
  }

  async deleteProduct(query: object): Promise<IProduct> {
    const deletedProduct = await this.productModel.findOneAndUpdate(query);
    return deletedProduct;
  }
}
