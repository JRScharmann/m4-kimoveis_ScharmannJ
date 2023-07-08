import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity('addresses')
class Address {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45, nullable: false })
    street: string

    @Column({ type: 'varchar', length: 8, nullable: false })
    zipCode: string

    @Column({ type: 'varchar', length: 7, nullable: true })
    number: string | null | undefined

    @Column({ type: 'varchar', length: 20, nullable: false })
    city: string

    @Column({ type: 'varchar', length: 2, nullable: false })
    state: string

    @OneToOne(() => RealEstate)
    realEstate: RealEstate
}

export { Address }