interface IAddress {
  name: string;
  email: string;
}

export interface IMessage {
  to: IAddress;
  from: IAddress;
  subject: string;
  body: string;
}

export type IEmailService = {
  sendMail({ to, from, subject, body }: IMessage): Promise<void>;
};
