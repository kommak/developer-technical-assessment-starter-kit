import { Repository } from 'typeorm';
import { Property } from './properties.entity';
export declare class PropertiesService {
    private propertyRepo;
    constructor(propertyRepo: Repository<Property>);
    findAll(): Promise<Property[]>;
    findTopViewed(limit?: number): Promise<Property[]>;
    findOne(id: number): Promise<Property | null>;
    create(project: Partial<Property>): Promise<Property>;
}
