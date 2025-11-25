import { DataSource } from 'typeorm';
import { PopularListing } from './popular-listing.interface';
export declare class ListingsService {
    private dataSource;
    constructor(dataSource: DataSource);
    getPopularListings(): Promise<PopularListing[]>;
    getFeaturedListings(): Promise<PopularListing[]>;
}
