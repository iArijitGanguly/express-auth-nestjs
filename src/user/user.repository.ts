import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { DEVELOPER } from '../role/constant/role-name.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { SafeUser } from './type/safe-user.type';
import { UserWithRole } from './type/user-role.type';

@Injectable()
export class UserRepository {
    private readonly prisma: DatabaseService;

    constructor(prisma: DatabaseService) {
        this.prisma = prisma;
    }

    async create(data: CreateUserDto, passwordHash: string): Promise<SafeUser> {
        return await this.prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                passwordHash,
                role: {
                    connect: {
                        name: DEVELOPER,
                    },
                },
            },
            omit: {
                passwordHash: true,
            },
        });
    }

    async findOneByEmail(email: string): Promise<UserWithRole | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                role: true,
            },
        });
    }
}
