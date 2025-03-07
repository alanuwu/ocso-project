import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Location } from "../../locations/entities/location.entity";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: string;
    @Column({
        type: "text",
        unique: true,
    })
    regionName: string;
    @Column("simple-array")
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];
}
