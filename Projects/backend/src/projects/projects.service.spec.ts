/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repository<Project>;

  const sampleProject: Project = {
    id: 1,
    name: 'Test Project',
    image_urls: ['image1.jpg'],
    price_range: '1000-2000',
    city: 'City',
    neighborhood: 'Neighborhood',
    details: 'Details',
    view_count: 50,
    sq_ft_or_area: 1200,
    search_vector: 'Details',
    amenities: ['test', 'test2'],
  };

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all projects', async () => {
      mockRepo.find.mockResolvedValue([sampleProject]);
      const result = await service.findAll();
      expect(result).toEqual([sampleProject]);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findTopViewed', () => {
    it('should return top viewed projects with limit', async () => {
      mockRepo.find.mockResolvedValue([sampleProject]);
      const result = await service.findTopViewed(6);
      expect(result).toEqual([sampleProject]);
      expect(mockRepo.find).toHaveBeenCalledWith({
        order: { view_count: 'DESC' },
        take: 6,
      });
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      mockRepo.findOneBy.mockResolvedValue(sampleProject);
      const result = await service.findOne(1);
      expect(result).toEqual(sampleProject);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create and save a project', async () => {
      const newProject = { name: 'New Project' };
      mockRepo.create.mockReturnValue(newProject as any);
      mockRepo.save.mockResolvedValue(sampleProject);

      const result = await service.create(newProject);
      expect(result).toEqual(sampleProject);
      expect(mockRepo.create).toHaveBeenCalledWith(newProject);
      expect(mockRepo.save).toHaveBeenCalledWith(newProject);
    });
  });
});
