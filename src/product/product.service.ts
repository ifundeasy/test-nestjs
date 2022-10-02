import { Injectable, NotFoundException } from '@nestjs/common';
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
    productId: string,
    updateProductDto: ProductUpdateDTO,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find();
    if (!productData || productData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return productData;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const existingProduct = await this.productModel.findById(productId).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return deletedProduct;
  }
}
