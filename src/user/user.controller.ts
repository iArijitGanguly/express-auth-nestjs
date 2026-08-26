import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { Roles } from '../decorators/roles/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '../guards/role/role.guard';
import { ADMIN } from '../role/constant/role-name.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(ADMIN)
    create(@Body() payload: CreateUserDto) {
        return this.userService.createUser(payload);
    }
}
