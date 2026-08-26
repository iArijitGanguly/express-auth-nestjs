import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserWithRole } from '../user/type/user-role.type';
import { UserRepository } from '../user/user.repository';
import { comparePassword } from '../utils/helpers/password.helper';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    private readonly userRepository: UserRepository;
    private readonly jwtService: JwtService;

    constructor(userRepository: UserRepository, jwtService: JwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    async signIn(payload: SignInDto): Promise<string> {
        const user: UserWithRole | null =
            await this.userRepository.findOneByEmail(payload.email);

        if (!user) {
            throw new NotFoundException('User not exists');
        }

        const isValidPassword = await comparePassword(
            payload.password,
            user.passwordHash,
        );

        if (!isValidPassword) {
            throw new BadRequestException('Wrong Password');
        }

        const token: string = await this.jwtService.signAsync({
            userId: user.id,
            role: user.role.name,
        });

        return token;
    }
}
