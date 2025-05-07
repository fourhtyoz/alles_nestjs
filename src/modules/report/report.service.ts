import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/users.entity';
import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportService {
    async generateUserReport(users: User[]): Promise<string> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'Username', key: 'username' },
            { header: 'Email', key: 'email' },
            { header: 'Active?', key: 'isActive' },
            { header: 'Created', key: 'createdAt' },
        ];

        users.forEach((user) => {
            worksheet.addRow({
                id: user.id,
                username: user.username,
                email: user.email,
                isActive: user.isActive,
                created: user.createdAt,
            });
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        const tempDir = path.join(__dirname, '../../../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const fileName = `users-report-${Date.now()}.xlsx`;
        const filePath = path.join(tempDir, fileName);

        await workbook.xlsx.writeFile(filePath);
        return filePath;
    }

    async deleteTempFile(filePath: string): Promise<void> {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error('Error cleaning up temp file', err);
        }
    }
}
