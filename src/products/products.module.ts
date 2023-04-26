import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductImages } from './entities/product-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImages])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
export class ProductImagesModule {}
