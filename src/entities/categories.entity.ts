import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
    name: string

    @OneToMany(() => RealEstate, (r) => r.category)
    realEstate: RealEstate[]
}

export { Category }