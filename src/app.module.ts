import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { RoleModule } from './role/role.module';

@Module({
    imports: [ConfigModule.forRoot(), HealthModule, DatabaseModule, RoleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
