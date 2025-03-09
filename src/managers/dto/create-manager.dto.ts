import {Manager} from "../entities/manager.entity";
import {IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength} from "class-validator";
import {Location} from "../../locations/entities/location.entity";
export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsEmail()
    managerEmail: string;
    @IsString()
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @IsObject()
    @IsOptional()
    location: Location;

}
