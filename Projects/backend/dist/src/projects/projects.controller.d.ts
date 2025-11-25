import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<Project[]>;
    getTopViewed(): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    create(project: Partial<Project>): Promise<Project>;
}
