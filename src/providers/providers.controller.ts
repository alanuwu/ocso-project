import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {ProvidersService} from './providers.service';
import {CreateProviderDto} from './dto/create-provider.dto';
import {UpdateProviderDto} from './dto/update-provider.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {UseGuards} from "@nestjs/common";
import {UserData} from "../auth/decorators/user.decorator";
import {User} from "../auth/entities/user.entity";
import {Roles} from "../auth/decorators/roles.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Auth} from "../auth/decorators/auth.decorator";
import {ROLES} from "../auth/constants/roles.constants";
import {ApiAuth} from "../auth/decorators/api.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiAuth()
@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) {
    }

    @Auth(ROLES.MANAGER)
    @Post()
    create(@Body() createProviderDto: CreateProviderDto) {
        return this.providersService.create(createProviderDto);
    }

    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get()
    findAll(@UserData() user: User) {
        if (user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado, solo admins y managers");
        return this.providersService.findAll();
    }

    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get('name/:name')
    findByName(@Param('name') name: string) {
        return this.providersService.findOneByName(name);
        //Implementar el service
    }

    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get(':id')
    findOne(@Param('id') id: string) {
        const provider = this.providersService.findOne(id);
        if (!provider) {
            throw new NotFoundException()
        }
        return provider;
    }
    @Auth(ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
        return this.providersService.update(id, updateProviderDto);
    }

    @Auth(ROLES.MANAGER)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providersService.remove(id);
    }
}
