import { Injectable } from '@nestjs/common';
import { IEmailService, IMessage } from '../email.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService implements IEmailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail({ to, from, subject, body }: IMessage): Promise<void> {
    return this.mailService.sendMail({
      from: {
        name: from.name,
        address: from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: body,
    });
  }
}
