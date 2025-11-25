declare const JwtAuthGuard_base: any;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest<TUser = any>(err: any, user: TUser): TUser;
}
export {};
