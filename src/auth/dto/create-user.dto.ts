import {IS_SEM_VER, IsEmail, IsString, MinLength} from "class-validator";
import {User} from "../entities/user.entity";

export class CreateUserDto extends User{
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
}
