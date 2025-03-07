import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Manager} from "../../managers/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";
import {Employee} from "../../employees/entities/employee.entity";

@Entity()
export class Location{
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddress: string;
    @Column('simple-array')
    locationLatLng: number[]; 

    @OneToOne(() =>  Manager)
    @JoinColumn({
        name: 'managerId',
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
