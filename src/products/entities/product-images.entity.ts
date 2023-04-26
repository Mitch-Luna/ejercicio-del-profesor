import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class ProductImages{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url:string;

    //relaciones de muchos a uno
    //muchas imagenes pueden ser de un producto
    @ManyToOne(
        () => Product,
        (product) => product.images
    )
    product: Product
}