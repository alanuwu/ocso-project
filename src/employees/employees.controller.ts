import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {Auth} from "../auth/decorators/auth.decorator";
import {ROLES} from "../auth/constants/roles.constants";
import {ApiNotImplementedResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee} from "./entities/employee.entity";
import {ApiAuth} from "../auth/decorators/api.decorator";

@ApiAuth()
@ApiTags('Employees')

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Alan B",
      employeeEmail: "john@gmail.com",
      employeeLastName: "John B",
      employeePhoneNumber: "12345678",
    } as Employee
  })

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: "./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return "OK";
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe( { version: '4'} ))
    id: string) { 
    return this.employeesService.findOne(id); 
  }

  // @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id') id: number) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' }))
  id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' }))
   id: string
  ){
    return this.employeesService.remove(id);
  }
}
