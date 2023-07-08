import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedules.entity";

@Entity('real_estate')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('boolean', { default: false })
    sold: boolean

    @Column("decimal", { precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: 'integer', nullable: false })
    size: number

    @CreateDateColumn({ nullable: false, type: "date" })
    createdAt: Date

    @UpdateDateColumn({ nullable: false, type: "date" })
    updatedAt: Date

    @OneToOne(() => Address, {
        cascade: ["insert"],
        eager: true
    })
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (c) => c.realEstate, {
        eager: true
    })
    category: Category

    @OneToMany(() => Schedule, (s) => s.realEstate)
    schedules: Array<Schedule>
}

export { RealEstate }