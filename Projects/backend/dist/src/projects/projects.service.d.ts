import { Repository } from 'typeorm';
import { Project } from './projects.entity';
export declare class ProjectsService {
    private projectRepo;
    constructor(projectRepo: Repository<Project>);
    findAll(): any;
    findTopViewed(limit?: number): Promise<Project[]>;
    findOne(id: number): any;
    create(project: Partial<Project>): any;
}
