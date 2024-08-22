import { z } from 'zod';
import {
  TransactionsFilterSchema,
  UpdateTransactionSchema,
  createCategorySchema,
  createTransactionSchema,
  createUserSchema,
  finacialEvolutionFilterSchema,
  userSchema,
} from './schemas';

export type UserData = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type CeateCategoryData = z.infer<typeof createCategorySchema>;
export type CreateTransactionData = z.infer<typeof createTransactionSchema>;
export type TransactionsFilterData = z.infer<typeof TransactionsFilterSchema>;
export type UpdateTransactionData = z.infer<typeof UpdateTransactionSchema>
export type finacialEvolutionFilterData = z.infer<typeof finacialEvolutionFilterSchema>;

