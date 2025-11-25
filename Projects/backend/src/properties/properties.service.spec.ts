/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { Property } from './properties.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repo: Repository<Property>;

  const sampleProperty: Property = {
    id: 1,
    name: 'Test Property',
    image_urls: ['image1.jpg'],
    price: 100000,
    city: 'City',
    neighborhood: 'Neighborhood',
    details: 'Some details',
    view_count: 10,
    sq_ft_or_area: 500,
    search_vector: 'details',
    bedrooms: 0,
    bathrooms: 0,
    amenities: ['parking'],
  };

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        { provide: getRepositoryToken(Property), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repo = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all properties', async () => {
      mockRepo.find.mockResolvedValue([sampleProperty]);
      const result = await service.findAll();
      expect(result).toEqual([sampleProperty]);
      expect(mockRepo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findTopViewed', () => {
    it('should return top viewed properties', async () => {
      mockRepo.find.mockResolvedValue([sampleProperty]);
      const result = await service.findTopViewed(6);
      expect(result).toEqual([sampleProperty]);
      expect(mockRepo.find).toHaveBeenCalledWith({
        order: { view_count: 'DESC' },
        take: 6,
      });
    });
  });

  describe('findOne', () => {
    it('should return a property by id', async () => {
      mockRepo.findOneBy.mockResolvedValue(sampleProperty);
      const result = await service.findOne(1);
      expect(result).toEqual(sampleProperty);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create and save a new property', async () => {
      const newPropertyData = { name: 'New Property' };
      mockRepo.create.mockReturnValue(sampleProperty);
      mockRepo.save.mockResolvedValue(sampleProperty);

      const result = await service.create(newPropertyData);
      expect(result).toEqual(sampleProperty);
      expect(mockRepo.create).toHaveBeenCalledWith(newPropertyData);
      expect(mockRepo.save).toHaveBeenCalledWith(sampleProperty);
    });
  });
});
