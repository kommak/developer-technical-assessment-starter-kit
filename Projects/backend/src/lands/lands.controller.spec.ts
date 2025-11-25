/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { LandsController } from './lands.controller';
import { LandsService } from './lands.service';
import { Land } from './lands.entity';

describe('LandsController', () => {
  let controller: LandsController;
  let service: LandsService;

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
    search_vector: 'Beautiful',
    amenities: ['test', 'test2'],
  };

  const mockLandsService = {
    findAll: jest.fn().mockResolvedValue([mockLand]),
    findTopViewed: jest.fn().mockResolvedValue([mockLand]),
    findOne: jest
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve(id === mockLand.id ? mockLand : null),
      ),
    create: jest
      .fn()
      .mockImplementation((land: Partial<Land>) =>
        Promise.resolve({ id: 2, ...land } as Land),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandsController],
      providers: [{ provide: LandsService, useValue: mockLandsService }],
    }).compile();

    controller = module.get<LandsController>(LandsController);
    service = module.get<LandsService>(LandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of lands', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockLand]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getTopViewed', () => {
    it('should return top viewed lands', async () => {
      const result = await controller.getTopViewed();
      expect(result).toEqual([mockLand]);
      expect(service.findTopViewed).toHaveBeenCalledWith(6);
    });
  });

  describe('findOne', () => {
    it('should return a land if found', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockLand);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null if not found', async () => {
      const result = await controller.findOne(999);
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create and return a new land', async () => {
      const newLand: Partial<Land> = { name: 'New Land', price: 200000 };
      const result = await controller.create(newLand);
      expect(result).toEqual({ id: 2, ...newLand });
      expect(service.create).toHaveBeenCalledWith(newLand);
    });
  });
});
