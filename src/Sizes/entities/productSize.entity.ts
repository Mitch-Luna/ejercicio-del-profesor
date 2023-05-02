import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Size } from "./shirts.entity";


@Entity()
export class ProductSize{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tallas:string;

    @ManyToOne(
        () => Size,
        (shirts) => shirts.size,
        {onDelete:'CASCADE'}
    )
    size: Size
}