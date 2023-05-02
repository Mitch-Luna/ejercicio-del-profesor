import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSize } from './productSize.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  tipo: string;

  @Column({ type: 'numeric' })
  precio: number;

  @Column({ type: 'text' })
  color: string;

  @Column({ type: 'text' })
  marca: string;

  @OneToMany(
    () => ProductSize,
    (ProductZise) => ProductZise.size,{
    cascade: true, 
    eager: true
})
  size?: ProductSize[];
}
