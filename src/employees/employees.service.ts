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
    private employeeRepository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    if(!employee) throw new NotFoundException();
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  findOne(id: string) {
    const employee =  this.employeeRepository.findOneBy({
      employeeId: id
    })
    if(!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      ...updateEmployeeDto,
      employeeId: id,
    });
  
    if (!employeeToUpdate) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
  
    return this.employeeRepository.save(employeeToUpdate);
  }
  

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: `Empleado con el id ${id} ha sido eliminado exitosamente`
    }
  }
}
