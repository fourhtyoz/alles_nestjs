import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule {}
