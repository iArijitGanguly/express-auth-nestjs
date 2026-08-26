import { Injectable } from '@nestjs/common';

import { Prisma, Role } from '../../generated/prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RoleRepository {
    private readonly prisma: DatabaseService;

    constructor(prisma: DatabaseService) {
        this.prisma = prisma;
    }

    async create(data: Prisma.RoleCreateInput): Promise<Role> {
        return await this.prisma.role.create({ data });
    }
}
