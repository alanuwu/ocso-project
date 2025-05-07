import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Region} from "./entities/region.entity";
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
      @InjectRepository(Region)
     private regionRepository: Repository<Region>,
  ){}
  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }


  findOne(id: string) {
    const region = this.regionRepository.findOneBy({
      regionId: id,
    })
    if(!region) throw new NotFoundException("No region found.");
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ... updateRegionDto
    })
    if(!regionToUpdate) throw new NotFoundException("No region found.");
    return this.regionRepository.save(regionToUpdate);
  }

  remove(id: string) {
    return this.regionRepository.delete({
      regionId: id
    })

  }
}
