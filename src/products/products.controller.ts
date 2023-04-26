import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';

@Controller('productos')
export class ProductsController {
  constructor(private readonly productServiceRepo: ProductsService) {}

  //Metodo para crear un producto
  @Post()
  create(@Body() productoDto: CreateProductDto) {
    return this.productServiceRepo.create(productoDto);
  }

  //Metodo para mostrar todos los productos
  @Get()
  findAll() {
    return this.productServiceRepo.findAll();
  }

  //Metodo para mostrar un producto especifico
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productServiceRepo.findOne(id);
  }

  //Eliminar un producto especifico
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productServiceRepo.remove(id);
  }

  //Crear método patch, para actualizar
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: CreateProductDto
  ){
    return this.productServiceRepo.update(id, updateProductDto);
  }
}
