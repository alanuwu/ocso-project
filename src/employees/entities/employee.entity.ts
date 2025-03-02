import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;
}
