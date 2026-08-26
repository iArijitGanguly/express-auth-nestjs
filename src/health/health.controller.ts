import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    @Version(VERSION_NEUTRAL)
    check() {
        return { message: 'healthy' };
    }
}
