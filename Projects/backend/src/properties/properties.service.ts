import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './properties.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,
  ) {}

  findAll() {
    return this.propertyRepo.find();
  }

  findTopViewed(limit = 6): Promise<Property[]> {
    return this.propertyRepo.find({
      order: { view_count: 'DESC' },
      take: limit,
    });
  }

  findOne(id: number) {
    return this.propertyRepo.findOneBy({ id });
  }

  create(project: Partial<Property>) {
    const newProperty = this.propertyRepo.create(project);
    return this.propertyRepo.save(newProperty);
  }
}
