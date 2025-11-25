import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
