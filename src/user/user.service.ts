import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';
import { hashPassword } from '../utils/helpers/password.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { SafeUser } from './type/safe-user.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(payload: CreateUserDto): Promise<SafeUser> {
        try {
            const passwordHash = await hashPassword(payload.password);
            return await this.userRepository.create(payload, passwordHash);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'A record with this value already exists',
                );
            }
            throw error;
        }
    }
}
