/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LandsService } from './lands.service';
import { Land } from './lands.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('LandsService', () => {
  let service: LandsService;
  let repo: Repository<Land>;

  const mockLand: Land = {
    id: 1,
    name: 'Beautiful Land',
    image_urls: ['land1.jpg', 'land2.jpg'],
    price: 100000,
    city: 'Musqat',
    neighborhood: 'NeighborhoodName',
    details: 'Some details',
    view_count: 50,
    sq_ft_or_area: 500,
    search_vector: 'details',
    amenities: ['test', 'test2'],
  };

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockLand]),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }) =>
        Promise.resolve(id === mockLand.id ? mockLand : null),
      ),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((data) => data),
    save: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: 2, ...data })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LandsService,
        { provide: getRepositoryToken(Land), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<LandsService>(LandsService);
    repo = module.get<Repository<Land>>(getRepositoryToken(Land));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all lands', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockLand]);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('findTopViewed', () => {
    it('should return top viewed lands with default limit', async () => {
      const result = await service.findTopViewed();
      expect(result).toEqual([mockLand]);
      expect(mockRepo.find).toHaveBeenCalledWith({
        order: { view_count: 'DESC' },
        take: 6,
      });
    });

    it('should return top viewed lands with custom limit', async () => {
      const result = await service.findTopViewed(3);
      expect(result).toEqual([mockLand]);
      expect(mockRepo.find).toHaveBeenCalledWith({
        order: { view_count: 'DESC' },
        take: 3,
      });
    });
  });

  describe('findOne', () => {
    it('should return a land if found', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockLand);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if not found', async () => {
      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('create', () => {
    it('should create and save a new land', async () => {
      const newLand: Partial<Land> = { name: 'New Land', price: 200000 };
      const result = await service.create(newLand);
      expect(result).toEqual({ id: 2, ...newLand });
      expect(mockRepo.create).toHaveBeenCalledWith(newLand);
      expect(mockRepo.save).toHaveBeenCalledWith(newLand);
    });
  });
});
