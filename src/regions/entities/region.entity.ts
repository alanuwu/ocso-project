import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
