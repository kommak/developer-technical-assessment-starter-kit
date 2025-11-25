/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingsService } from './listings.service';
import { DataSource } from 'typeorm';
import { PopularListing } from './popular-listing.interface';

describe('ListingsService', () => {
  let service: ListingsService;
  let dataSource: DataSource;

  const mockDataSource = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPopularListings()', () => {
    it('should return popular listings', async () => {
      const mockResult: PopularListing[] = [
        {
          id: 1,
          name: 'Test Project',
          image_urls: ['img.jpg'],
          price: '100000',
          city: 'Muscat',
          neighborhood: 'Al Khuwair',
          details: 'Nice place',
          view_count: 1000,
          sq_ft_or_area: 200,
          type: 'project',
        },
      ];

      mockDataSource.query.mockResolvedValue(mockResult);

      const result = await service.getPopularListings();

      expect(result).toEqual(mockResult);
      expect(dataSource.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFeaturedListings()', () => {
    it('should return featured listings', async () => {
      const mockResult: PopularListing[] = [
        {
          id: 2,
          name: 'Test Property',
          image_urls: ['img2.jpg'],
          price: '200000',
          city: 'Muscat',
          neighborhood: 'Qurum',
          details: 'Luxury place',
          view_count: 500,
          sq_ft_or_area: 300,
          type: 'property',
        },
      ];

      mockDataSource.query.mockResolvedValue(mockResult);

      const result = await service.getFeaturedListings();

      expect(result).toEqual(mockResult);
      expect(dataSource.query).toHaveBeenCalledTimes(1);
    });
  });
});
