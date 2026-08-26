import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface JwtPayload {
    userId: number;
    role: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token: string | undefined = request.cookies?.accessToken;

        if (!token) {
            throw new UnauthorizedException('No access token provided');
        }

        try {
            const payload =
                await this.jwtService.verifyAsync<JwtPayload>(token);
            request['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
