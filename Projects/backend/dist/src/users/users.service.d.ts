import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private usersRepo;
    constructor(usersRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
