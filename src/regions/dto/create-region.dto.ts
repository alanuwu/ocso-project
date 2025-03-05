import {isArray, IsString, MaxLength} from "class-validator";
import { Region} from "../entities/region.entity";

export class CreateRegionDto extends Region{
    @IsString()
    @MaxLength(100)
    regionId: string;
    regionStates: string[];
}
