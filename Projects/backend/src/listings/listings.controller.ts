import { Controller, Get } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { PopularListing } from './popular-listing.interface';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get('popular')
  async getPopular(): Promise<PopularListing[]> {
    return this.listingsService.getPopularListings();
  }

  @Get('featured')
  async getFeatured(): Promise<PopularListing[]> {
    return this.listingsService.getFeaturedListings();
  }
}
