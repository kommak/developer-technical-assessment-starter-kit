import { PropertiesService } from './properties.service';
import { Property } from './properties.entity';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(): Promise<Property[]>;
    getTopViewed(): Promise<Property[]>;
    findOne(id: number): Promise<Property | null>;
    create(property: Partial<Property>): Promise<Property>;
}
