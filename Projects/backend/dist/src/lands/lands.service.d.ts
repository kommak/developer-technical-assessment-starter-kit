import { Repository } from 'typeorm';
import { Land } from './lands.entity';
export declare class LandsService {
    private landRepo;
    constructor(landRepo: Repository<Land>);
    findAll(): any;
    findTopViewed(limit?: number): Promise<Land[]>;
    findOne(id: number): any;
    create(project: Partial<Land>): any;
}
