import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { ProductModule } from './product';
import { SoldProductModule } from './sold-product';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    ProductModule,
    SoldProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
