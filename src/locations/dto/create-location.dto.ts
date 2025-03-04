import { ArrayNotEmpty, IsAlpha, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity"
import { isSharedArrayBuffer } from "util/types";
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
    locationLatLng: number[];

}
