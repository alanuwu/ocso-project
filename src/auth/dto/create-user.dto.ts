import {IS_SEM_VER, IsEmail, IsIn, IsOptional, IsString, MinLength} from "class-validator";
import {User} from "../entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    userEmail: string;
    @ApiProperty({
        default: "lkjasdlkasdka1234"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRole: string[];
}
