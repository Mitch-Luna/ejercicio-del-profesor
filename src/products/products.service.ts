import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product.dto';
import { ProductImages } from './entities/product-images.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImages)
    private readonly imagesRepository: Repository<ProductImages>,
  ) {}

  //Metodo para crear un producto
  // async create(productoDto: CreateProductDto) {
  //   const product = this.productRepository.create(productoDto);
  //   await this.productRepository.save(product);

  //   return product;
  // }
  async create(productoDto: CreateProductDto){
    const { images = [], ...detalleProducto } = productoDto;
    const product = await this.productRepository.create({
      ...detalleProducto,
      images : images.map((image) => this.imagesRepository.create({url: image}))
    })
    await this.productRepository.save(product);
    return product;
  }

  //Metodo para visualizar todos los productos
  findAll() {
    return this.productRepository.find();
  }

  //Metodo para visualizar un producto especifico
  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  //Remover un producto especifico
  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }

  // //Actualizar un producto especifico
  // async update(id: string, cambios: CreateProductDto) {
  //   const findProduct = await this.findOne(id);
  //   const updatedProducto = await this.productRepository.merge(
  //     findProduct,
  //     cambios,
  //   );

  //   return this.productRepository.save(updatedProducto);
  // }
  async update(id: string, cambios: CreateProductDto){
    const product = await this.productRepository.preload({
      id: id, 
      ...cambios,
      images:[],
    });
    await this.productRepository.save(product);
    return product;
  }
} 
