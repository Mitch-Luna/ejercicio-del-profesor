import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/shirts.entity';
import { ProductsController } from './size.controller';
import { SizeService } from './size.service';
import { ProductSize } from './entities/productSize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size, ProductSize])],
  controllers: [ProductsController],
  providers: [SizeService],
})
export class shirtsModule {}
export class ShirtsSizesModule {}
