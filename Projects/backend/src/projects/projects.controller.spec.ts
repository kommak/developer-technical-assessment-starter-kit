/* eslint-disable @typescript-eslint/no-unused-vars */
// src/projects/projects.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project } from './projects.entity';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProjectsService = {
    findAll: jest.fn(),
    findTopViewed: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtGuard = {
    canActivate: jest.fn(() => true),
  };

  const sampleProject: Project = {
    id: 1,
    name: 'Test Project',
    image_urls: ['project1.jpg', 'project2.jpg'],
    price_range: '1000-2000',
    city: 'City',
    neighborhood: 'Neighborhood',
    details: 'Some details',
    view_count: 10,
    sq_ft_or_area: 1200,
    search_vector: 'details',
    amenities: ['test', 'test2'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: mockProjectsService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all projects', async () => {
      mockProjectsService.findAll.mockResolvedValue([sampleProject]);
      const result = await controller.findAll();
      expect(result).toEqual([sampleProject]);
      expect(mockProjectsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTopViewed', () => {
    it('should return top viewed projects', async () => {
      mockProjectsService.findTopViewed.mockResolvedValue([sampleProject]);
      const result = await controller.getTopViewed();
      expect(result).toEqual([sampleProject]);
      expect(mockProjectsService.findTopViewed).toHaveBeenCalledWith(6);
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      mockProjectsService.findOne.mockResolvedValue(sampleProject);
      const result = await controller.findOne(1);
      expect(result).toEqual(sampleProject);
      expect(mockProjectsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a project', async () => {
      mockProjectsService.create.mockResolvedValue(sampleProject);
      const newProject = {
        name: 'New Project',
        image_urls: ['project1.jpg'],
      };
      const result = await controller.create(newProject);
      expect(result).toEqual(sampleProject);
      expect(mockProjectsService.create).toHaveBeenCalledWith(newProject);
    });
  });
});
