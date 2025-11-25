import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-playload.interface';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): {
        id: any;
        email: any;
    };
}
export {};
