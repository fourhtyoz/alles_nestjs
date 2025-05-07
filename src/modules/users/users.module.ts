import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from 'src/modules/email/email.module';
import { ReportModule } from 'src/modules/report/report.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), EmailModule, ReportModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
