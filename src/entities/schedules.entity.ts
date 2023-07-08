import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'date', nullable: false })
    date: string | Date

    @Column({ type: 'time', nullable: false })
    hour: string

    @ManyToOne(() => User, (u) => u.schedules)
    user: User

    @ManyToOne(() => RealEstate, (r) => r.schedules)
    realEstate: RealEstate
}

export { Schedule }