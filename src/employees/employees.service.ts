import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRespository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRespository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRespository.find();
  }

  findOne(id: string) {
    const employee =  this.employeeRespository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRespository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
  
    if (!employeeToUpdate) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
  
    return this.employeeRespository.save(employeeToUpdate);
  }
  

  remove(id: string) {
    this.employeeRespository.delete({
      employeeId: id
    })
    return {
      message: `Empleado con el id ${id} ha sido eliminado exitosamente`
    }
  }
}
