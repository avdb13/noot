import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class MailService {
  private readonly client: IMailgunClient = new Mailgun(FormData).client({
    username: 'api',
    key: process.env.MAIL_API_KEY!,
  });

  send(recipient: string) {
    return this.client.messages.create(process.env.MAIL_DOMAIN!, {
      from: '',
      to: [recipient],
      subject: 'verify your Noot account',
      html: '',
    });
  }
}
