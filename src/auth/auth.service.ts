import {Injectable, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {UpdateUserDto} from "./dto/update-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        ){}
    async registerUser(createUserDto: CreateUserDto) {
        createUserDto.userPassword = await bcrypt.hash(createUserDto.userPassword, 5);
        return this.userRepository.save(createUserDto);

    }
    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
        where:{
            userEmail: loginUserDto.userEmail,
        }
        });
        console.log("Usuario encontrado",user);
        console.log("Resultado de no encontrar user: ", (!user))
        if(!user) throw new UnauthorizedException("User Not Found");
        const match = await bcrypt.compare(
            loginUserDto.userPassword,
            user.userPassword,
            );
        if(!match) throw new UnauthorizedException("No estas autorizado");
        const payload = {
            userEmail: user.userEmail,
            userPassword: user.userPassword,
            userRoles: user.userRoles,
        }
        const token = this.jwtService.sign(payload);
        return token;
    }
    async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
        const newUserData = await this.userRepository.preload({
            userEmail,
            ...updateUserDto,
        });
        if(!newUserData) throw new NotFoundException("User Not Found");
        this.userRepository.save(newUserData);
        return newUserData;
    }
}
