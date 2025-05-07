import { Injectable, Inject } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
    constructor(
        @Inject('EMAIL_TRANSPORT') private readonly transporter: Transporter,
    ) {}

    async sendEmail(
        to: string,
        subject: string,
        text: string,
        attachmentPath?: string,
        attachmentName?: string,
    ): Promise<void> {
        const mailOptions = {
            from: 'admin@alles.com',
            to,
            subject,
            text,
        };

        if (attachmentName && attachmentPath) {
            mailOptions['attachments'] = [
                {
                    filename: attachmentName,
                    path: attachmentPath,
                },
            ];
        }

        await this.transporter.sendMail(mailOptions);
    }
}
