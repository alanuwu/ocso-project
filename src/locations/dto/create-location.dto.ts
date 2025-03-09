import {ArrayNotEmpty, IsAlpha, IsArray, IsObject, IsOptional, IsString, MaxLength} from "class-validator";
import { Location } from "../entities/location.entity"
import { isSharedArrayBuffer } from "util/types";
import {Region} from "../../regions/entities/region.entity";
export class CreateLocationDto{
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationId: number;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}
