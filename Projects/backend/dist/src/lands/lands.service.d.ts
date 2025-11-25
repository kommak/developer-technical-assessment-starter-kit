import { Repository } from 'typeorm';
import { Land } from './lands.entity';
export declare class LandsService {
    private landRepo;
    constructor(landRepo: Repository<Land>);
    findAll(): Promise<Land[]>;
    findTopViewed(limit?: number): Promise<Land[]>;
    findOne(id: number): Promise<Land | null>;
    create(project: Partial<Land>): Promise<Land>;
}
