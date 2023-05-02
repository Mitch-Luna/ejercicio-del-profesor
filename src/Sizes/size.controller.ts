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
  import { SizeService } from './size.service';
  import { CreateShirtsDto } from './dto/shirts.dto';
  
  @Controller('shirts')
  export class ProductsController {
    constructor(private readonly productServiceRepo: SizeService) {}
  
    @Post()
    create(@Body() productoDto: CreateShirtsDto) {
      return this.productServiceRepo.create(productoDto);
    }
  
    @Get()
    findAll() {
      return this.productServiceRepo.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.productServiceRepo.findOne(id);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.productServiceRepo.remove(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateProductDto: CreateShirtsDto
    ){
      return this.productServiceRepo.update(id, updateProductDto);
    }
  }
  