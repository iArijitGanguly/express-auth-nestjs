import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ROLES_KEY } from '../../decorators/roles/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    private readonly reflector: Reflector;

    constructor(reflector: Reflector) {
        this.reflector = reflector;
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles?.length) return true;

        const { user } = context.switchToHttp().getRequest<Request>();

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        return true;
    }
}
