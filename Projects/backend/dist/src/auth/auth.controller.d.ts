import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    login(dto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
