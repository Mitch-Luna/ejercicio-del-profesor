import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Size } from './entities/shirts.entity';
import { CreateShirtsDto } from './dto/shirts.dto';
import { ProductSize } from './entities/productSize.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly productRepository: Repository<Size>,

    @InjectRepository(ProductSize)
    private readonly sizeRepository: Repository<ProductSize>,
    private readonly dataSource: DataSource,
  ) {}

  async create(productoDto:CreateShirtsDto){
    const { size = [], ...detalleProducto } = productoDto;
    const product = await this.productRepository.create({
      ...detalleProducto,
      size : size.map((sizes) => this.sizeRepository.create({tallas: sizes}))
    })
    await this.productRepository.save(product);
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations:['images']
    });
  }


  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }


  async update(id: string, cambios: CreateShirtsDto){
    const {size, ...updateAll} = cambios;
    const product = await this.productRepository.preload({
      id: id, 
      ...updateAll,

    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if(size){
      await queryRunner.manager.delete( ProductSize,{product:{id}}) 
        product.size = size.map((tallas)=> this.sizeRepository.create({tallas:tallas}))
    }else{
      product.size = await this.sizeRepository.findBy({size:{id}})
    }

    await queryRunner.manager.save(product)
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return product;
  }
} 
