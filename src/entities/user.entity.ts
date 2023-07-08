import { getRounds, hashSync } from "bcryptjs";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Schedule } from "./schedules.entity";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
    email: string

    @Column({ type: 'varchar', length: 120, nullable: false })
    password: string

    @Column('boolean', { default: false })
    admin: boolean

    @CreateDateColumn({ nullable: false, type: "date" })
    createdAt: Date

    @UpdateDateColumn({ nullable: false, type: "date" })
    updatedAt: Date

    @DeleteDateColumn({ nullable: true, type: "date" })
    deletedAt?: Date | null

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hasRounds: number = getRounds(this.password);
        if (!hasRounds) {
            this.password = hashSync(this.password, 10);
        }
    }

    @OneToMany(() => Schedule, (s) => s.user)
    schedules: Array<Schedule>
}

export { User }