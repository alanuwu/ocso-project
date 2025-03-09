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
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {UseGuards} from "@nestjs/common";
import {UserData} from "../auth/decorators/user.decorator";
import {User} from "../auth/entities/user.entity";
import {Roles} from "../auth/decorators/roles.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Auth} from "../auth/decorators/auth.decorator";

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @Auth("Admin")
  @Get()
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado, solo admins y managers");
    return this.providersService.findAll();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string){
    //Implementar el service
    return this.providersService.findOneByName(name);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider){
      throw new NotFoundException()
    }
    return provider;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
