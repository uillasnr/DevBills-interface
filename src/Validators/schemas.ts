import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().min(1, {
    message: 'O Email de usuário deve conter pelo menos 1 caractere.',
  }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter pelo menos 6 caracteres.' }),
});

export const createUserSchema = z.object({
    name: z.string().min(1, {
      message: 'O nome de usuário deve conter pelo menos 1 caractere.',
    }),
    email: z
      .string()
      .email({
        message: 'Formato de email inválido.',
      })
      .min(1, {
        message: 'O Email de usuário deve conter pelo menos 1 caractere.',
      }),
    password: z
      .string()
      .min(6, { message: 'A senha deve conter pelo menos 6 caracteres.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve conter pelo menos 6 caracteres.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export const createCategorySchema = z.object({
  //userId: z.string().optional(), 
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere.' })
    .max(255),
  color: z.string().min(1, { message: 'Deve seguir o padrão #rrggbb' }),
 // Icon: z.string().min(1, { message: 'Adicione um Ícone' }).max(255),
});

export const createTransactionSchema = z.object({
  userId: z.string().optional(),
  categoryId: z.string().min(1, { message: 'Escolha uma categoria válida' }),
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere' })
    .max(255),
  amount: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 dígito' })
    .max(255),
  date: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/, {
      message: 'Data inválida',
    }),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Selecione um tipo válido' }),
  }),
  observation: z.string().optional(),
});

export const UpdateTransactionSchema = z.object({
  userId: z.string().optional(),
  categoryId: z.string().min(1, { message: 'Escolha uma categoria válida' }),
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere' })
    .max(255),
  amount: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 dígito' })
    .max(255),
  date: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/, {
      message: 'Data inválida',
    }),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Selecione um tipo válido' }),
  }),
  observation: z.string().optional(),
});

export const TransactionsFilterSchema = z.object({
  userId: z.string().optional(),
  title: z.string().optional(),
  categoryId: z.string().optional(),
  beginDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/, {
      message: 'Data inválida',
    }),
  endDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/, {
      message: 'Data inválida',
    }),
});

export const finacialEvolutionFilterSchema = z.object({
  year: z.string().regex(/\d/, { message: 'Digite um ano válido' }),
});
