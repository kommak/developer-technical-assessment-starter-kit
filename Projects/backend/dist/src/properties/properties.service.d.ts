import { Repository } from 'typeorm';
import { Property } from './properties.entity';
export declare class PropertiesService {
    private propertyRepo;
    constructor(propertyRepo: Repository<Property>);
    findAll(): any;
    findTopViewed(limit?: number): Promise<Property[]>;
    findOne(id: number): any;
    create(project: Partial<Property>): any;
}
