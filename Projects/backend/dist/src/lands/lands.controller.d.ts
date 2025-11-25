import { LandsService } from './lands.service';
import { Land } from './lands.entity';
export declare class LandsController {
    private readonly landsService;
    constructor(landsService: LandsService);
    findAll(): Promise<Land[]>;
    getTopViewed(): Promise<Land[]>;
    findOne(id: number): Promise<Land | null>;
    create(land: Partial<Land>): Promise<Land>;
}
