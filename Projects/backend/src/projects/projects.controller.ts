import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('top-viewed')
  getTopViewed(): Promise<Project[]> {
    return this.projectsService.findTopViewed(6);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project | null> {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() project: Partial<Project>): Promise<Project> {
    return this.projectsService.create(project);
  }
}
