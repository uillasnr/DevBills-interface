import { z } from 'zod';
import {
  TransactionsFilterSchema,
  createCategorySchema,
  createTransactionSchema,
  finacialEvolutionFilterSchema,
} from './schemas';

export type CeateCategoryData = z.infer<typeof createCategorySchema>;
export type CreateTransactionData = z.infer<typeof createTransactionSchema>;
export type TransactionsFilterData = z.infer<typeof TransactionsFilterSchema>;
export type finacialEvolutionFilterData = z.infer<typeof finacialEvolutionFilterSchema>;
