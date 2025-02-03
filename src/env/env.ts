import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().describe('Porta do servidor'),
  HOST_MAIL: z.string().describe('Host do provider de email'),
  PORT_MAIL: z.coerce.number().describe('Porta do provider de email'),
  USER_MAIL: z.string().describe('Usuário do provider de email'),
  PASSWORD_MAIL: z.string().describe('Senha do provider de email'),
  JWT_SECRET: z.string().describe('Secret para jwt'),
});

export type Env = z.infer<typeof envSchema>;
