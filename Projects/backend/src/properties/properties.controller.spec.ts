/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { Property } from './properties.entity';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: PropertiesService;

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
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['amenity1', 'amenity2'],
  };

  const mockService = {
    findAll: jest.fn(),
    findTopViewed: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [{ provide: PropertiesService, useValue: mockService }],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all properties', async () => {
      mockService.findAll.mockResolvedValue([sampleProperty]);

      const result = await controller.findAll();

      expect(result).toEqual([sampleProperty]);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTopViewed', () => {
    it('should return top viewed properties with default limit 6', async () => {
      mockService.findTopViewed.mockResolvedValue([sampleProperty]);

      const result = await controller.getTopViewed();

      expect(result).toEqual([sampleProperty]);
      expect(mockService.findTopViewed).toHaveBeenCalledWith(6);
    });
  });

  describe('findOne', () => {
    it('should return a property by ID', async () => {
      mockService.findOne.mockResolvedValue(sampleProperty);

      const result = await controller.findOne(1);

      expect(result).toEqual(sampleProperty);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return null if property not found', async () => {
      mockService.findOne.mockResolvedValue(null);

      const result = await controller.findOne(999);

      expect(result).toBeNull();
      expect(mockService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create a new property', async () => {
      const newProperty: Partial<Property> = { name: 'New Property' };
      mockService.create.mockResolvedValue(sampleProperty);

      const result = await controller.create(newProperty);

      expect(result).toEqual(sampleProperty);
      expect(mockService.create).toHaveBeenCalledWith(newProperty);
    });
  });
});
