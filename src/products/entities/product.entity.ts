import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImages } from './product-images.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'numeric' })
  price: number;

  //relaciones un producto puede tener muchas imagenes
  @OneToMany(
    () => ProductImages,
    (productImages) => productImages.product,{
    cascade: true
})
  images?: ProductImages[];
}
