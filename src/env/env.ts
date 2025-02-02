import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().describe('Porta do servidor'),
});

export type Env = z.infer<typeof envSchema>;
