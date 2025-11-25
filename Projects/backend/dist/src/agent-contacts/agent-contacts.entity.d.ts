import { User } from '../users/users.entity';
export declare class AgentContact {
    id: number;
    user: User;
    target_type: 'property' | 'project' | 'land';
    target_id: number;
    contact_date: Date;
}
