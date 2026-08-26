import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma, Role } from '../../generated/prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    private readonly roleRepository: RoleRepository;

    constructor(roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    async createRole(data: CreateRoleDto): Promise<Role> {
        try {
            return await this.roleRepository.create(data);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code == 'P2002'
            ) {
                throw new ConflictException(
                    'A record with this value already exists',
                );
            }

            throw error;
        }
    }
}
