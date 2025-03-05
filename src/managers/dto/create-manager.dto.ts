import {Manager} from "../entities/manager.entity";
import {IsEmail, IsNumber, IsString, MaxLength} from "class-validator";

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

}
