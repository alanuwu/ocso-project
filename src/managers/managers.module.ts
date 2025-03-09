import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from '../auth/constants/jwt.constants';
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Manager]),
        AuthModule,
    ],
    controllers: [ManagersController],
    providers: [ManagersService],
})
export class ManagersModule {}
