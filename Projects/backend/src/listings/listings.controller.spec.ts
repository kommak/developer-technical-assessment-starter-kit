/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { PopularListing } from './popular-listing.interface';

describe('ListingsController', () => {
  let controller: ListingsController;
  let service: ListingsService;

  const sampleListing: PopularListing = {
    id: 1,
    name: 'Sample Listing',
    image_urls: ['image1.jpg'],
    price: '100000 - 200000',
    city: 'City',
    neighborhood: 'Neighborhood',
    details: 'Some details',
    view_count: 100,
    sq_ft_or_area: 500,
    type: 'property',
  };

  const mockService = {
    getPopularListings: jest.fn(),
    getFeaturedListings: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingsController],
      providers: [{ provide: ListingsService, useValue: mockService }],
    }).compile();

    controller = module.get<ListingsController>(ListingsController);
    service = module.get<ListingsService>(ListingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPopular', () => {
    it('should return popular listings', async () => {
      mockService.getPopularListings.mockResolvedValue([sampleListing]);

      const result = await controller.getPopular();

      expect(result).toEqual([sampleListing]);
      expect(mockService.getPopularListings).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFeatured', () => {
    it('should return featured listings', async () => {
      mockService.getFeaturedListings.mockResolvedValue([sampleListing]);

      const result = await controller.getFeatured();

      expect(result).toEqual([sampleListing]);
      expect(mockService.getFeaturedListings).toHaveBeenCalledTimes(1);
    });
  });
});
