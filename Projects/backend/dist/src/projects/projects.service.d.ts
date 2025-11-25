import { Repository } from 'typeorm';
import { Project } from './projects.entity';
export declare class ProjectsService {
    private projectRepo;
    constructor(projectRepo: Repository<Project>);
    findAll(): Promise<Project[]>;
    findTopViewed(limit?: number): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    create(project: Partial<Project>): Promise<Project>;
}
