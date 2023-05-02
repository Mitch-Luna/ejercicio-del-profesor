import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {  ProductImagesModule, ProductsModule } from './products/products.module';
import { ShirtsSizesModule, shirtsModule } from './Sizes/size.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      //configuraciones para la base de datos
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductImagesModule,
    ProductsModule,
    ShirtsSizesModule,
    shirtsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
