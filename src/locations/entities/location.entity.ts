import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Manager} from "../../managers/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";
import {Employee} from "../../employees/entities/employee.entity";
import {ApiProperty} from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

@Entity()
export class Location{
    @PrimaryGeneratedColumn('increment')
    @Optional()
    locationId: number;
    @ApiProperty({
        default: "OCSO Juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Avenida de las ciencias, S/N, 74895"
    })
    @Column('text')
    locationAddress: string;
    @ApiProperty({
        default: [12, 21]
    })
    @Column('simple-array')
    locationLatLng: number[]; 

    @OneToOne(() =>  Manager, {
        eager: true,
    })
    @JoinColumn({
        name: 'managerId',
    })
    manager: Manager | string;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
