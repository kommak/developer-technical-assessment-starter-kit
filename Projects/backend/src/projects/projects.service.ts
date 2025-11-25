import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepo.find();
  }

  findTopViewed(limit = 6): Promise<Project[]> {
    return this.projectRepo.find({
      order: { view_count: 'DESC' },
      take: limit,
    });
  }

  findOne(id: number) {
    return this.projectRepo.findOneBy({ id });
  }

  create(project: Partial<Project>) {
    const newProject = this.projectRepo.create(project);
    return this.projectRepo.save(newProject);
  }
}
