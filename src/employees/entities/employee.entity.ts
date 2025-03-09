import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import {User} from "../../auth/entities/user.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    employeeName: string;
    @Column('text')
    employeeLastName: string;
    @Column('text')
    employeePhoneNumber: string;
    @Column('text', {
        unique: true,
    })
    emplloyeeEmail: string;
    @Column({
        type: 'text',
         nullable: true
    })
    employeePhoto: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: 'locationId',
    })
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId',
    })
    user: User;
}
