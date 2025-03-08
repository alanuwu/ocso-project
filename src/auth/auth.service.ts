import {Injectable, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}
    registerUser(createUserDto: CreateUserDto) {
        createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
        return this.userRepository.save(createUserDto);
    }
    async loginUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.findOne({
        where:{
            userEmail: createUserDto.userEmail
        }
        })
        if(!user) throw new NotFoundException("User Not Found");
        const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
        const token = jwt.sign(JSON.stringify(user), "SECRET KEY");
        if(!match) throw new UnauthorizedException("No estas autorizado");

    }
}
