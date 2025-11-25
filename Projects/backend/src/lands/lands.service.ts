import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Land } from './lands.entity';

@Injectable()
export class LandsService {
  constructor(
    @InjectRepository(Land)
    private landRepo: Repository<Land>,
  ) {}

  findAll() {
    return this.landRepo.find();
  }

  findTopViewed(limit = 6): Promise<Land[]> {
    return this.landRepo.find({
      order: { view_count: 'DESC' },
      take: limit,
    });
  }

  findOne(id: number) {
    return this.landRepo.findOneBy({ id });
  }

  create(project: Partial<Land>) {
    const newLand = this.landRepo.create(project);
    return this.landRepo.save(newLand);
  }
}
