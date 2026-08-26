import { Body, Controller, Post } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    private readonly roleService: RoleService;

    constructor(roleService: RoleService) {
        this.roleService = roleService;
    }

    @Post()
    create(@Body() payload: CreateRoleDto) {
        return this.roleService.createRole(payload);
    }
}
