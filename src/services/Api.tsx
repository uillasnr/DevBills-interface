import axios from 'axios';
import {
  Category,
  CreateCategory,
  CreateTransaction,
  Transaction,
  TransactionsFilter,
} from './Api-types';

export class ApiService {
  private static client = axios.create({
    baseURL: "http://localhost:3333"
  });

  static async createCategory(CreateCategoryData: CreateCategory): Promise<Category> {
    const { data } = await ApiService.client.post<Category>("/categories", CreateCategoryData);
    console.log("funcionou uillasssss",data);
    return data;
    
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await ApiService.client.get<Category[]>("/categories");

    return data;
  }

  static async createTransaction(CreateTransactionData: CreateTransaction): Promise<Transaction> {
    const { data } = await ApiService.client.post<Transaction>("/transactions", CreateTransactionData);

    return data;
  }

  static async getTransactions({
    title,
    categoryId,
    beginDate,
    endDate,
  }: TransactionsFilter): Promise<Transaction[]> {
    const { data } = await ApiService.client.get<Transaction[]>(
      '/transactions',
      {
        params: {
          ...(title?.length && { title }),
          ...(categoryId?.length && { categoryId }),
          beginDate,
          endDate,
        },
      },
    );
    return data;
  }
}
