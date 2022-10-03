import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { UserModule, UserService } from './user';
import { ProductModule, ProductService } from './product';
import { SoldProductModule, SoldProductService } from './sold-product';
import { ConstantModule, ConstantService } from './constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ConstantModule,
    AuthModule,
    UserModule,
    ProductModule,
    SoldProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly constantService: ConstantService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly soldProductService: SoldProductService,
  ) {
    this.onApplicationBootstrap.bind(this);
  }

  async seedUsers() {
    const { users: defaultUsers } = this.constantService.data;
    const userService = this.userService;
    return await Promise.all(
      defaultUsers.map((user) => {
        return userService.get(user.query).then((data) => {
          if (!data) return userService.create(user.payload);
          return data;
        });
      }),
    );
  }

  async seedProducts() {
    const { products: defaultProducts } = this.constantService.data;
    const productService = this.productService;
    return await Promise.all(
      defaultProducts.map((product) => {
        return productService.getProduct(product.query).then((data) => {
          if (!data) return productService.createProduct(product.payload);
          return data;
        });
      }),
    );
  }

  async seedSoldProducts() {
    const { soldProducts: defaultSoldProducts } = this.constantService.data;
    const soldProductService = this.soldProductService;
    return await Promise.all(
      defaultSoldProducts.map((sold) => {
        return soldProductService.getSoldProduct(sold.query).then((data) => {
          if (!data) {
            return soldProductService.createSoldProduct(sold.payload as any);
          }
          return data;
        });
      }),
    );
  }

  async onApplicationBootstrap(): Promise<any> {
    Promise.all([
      this.seedUsers(),
      this.seedProducts(),
      this.seedSoldProducts(),
    ]);
  }
}
