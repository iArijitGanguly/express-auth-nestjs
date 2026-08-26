import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() payload: SignInDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token: string = await this.authService.signIn(payload);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
}
