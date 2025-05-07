import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Manager} from "./entities/manager.entity";

@Injectable()
export class ManagersService {
  constructor(
     @InjectRepository(Manager)
     private managerRepository: Repository<Manager>
  ){}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOneBy({
      managerId: id,
    })
  if(!manager) throw new NotFoundException("No Manager found");
  return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })
  if(!managerToUpdate) throw new BadRequestException();
  return this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    const managerToRemove = await this.managerRepository.findOneBy({
      managerId: id,
    });
    if(!managerToRemove) throw new NotFoundException("No Manager found");
    return this.managerRepository.remove(managerToRemove);
  }
}
