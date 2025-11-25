import { ListingsService } from './listings.service';
import { PopularListing } from './popular-listing.interface';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    getPopular(): Promise<PopularListing[]>;
    getFeatured(): Promise<PopularListing[]>;
}
