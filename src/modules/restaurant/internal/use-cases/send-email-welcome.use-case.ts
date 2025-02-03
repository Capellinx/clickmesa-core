import { Inject, Injectable } from '@nestjs/common';
import { IEmailService } from 'src/modules/services/email.service';

@Injectable()
export class SendEmailWelcomeUseCase {
  constructor(
    @Inject('IEmailService')
    private readonly emailService: IEmailService,
  ) {}

  async execute({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<void> {
    return await this.emailService.sendMail({
      to: {
        name,
        email,
      },
      from: {
        name: 'Click Mesa',
        email: 'suporte@clickmesa.com.br',
      },
      subject: 'Seja bem-vindo ao ClickMesa',
      body:
        'Seja bem vindo ao ClickMesa, sua senha para acesso ao sistema é: ' +
        password,
    });
  }
}
