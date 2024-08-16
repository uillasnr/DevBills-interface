import axios from 'axios';
import {
  Category,
  CreateCategory,
  CreateTransaction,
  CreateUser,
  Dashboard,
  DashboardFilters,
  FinancialEvolution,
  FinancialEvolutionFilters,
  LoginData,
  Transaction,
  TransactionsFilter,
  UpdateTransaction,
  User,
} from './Api-types';

export class ApiService {
  private static client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: '',
    },
  });

  static setAuthorization(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  static init(redirectToLogin: () => void) {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          redirectToLogin();
          console.log(redirectToLogin, 'teste redirect');
        }
        return Promise.reject(error);
      },
    );
  }

  static async login(loginData: LoginData): Promise<User> {
    const { data } = await ApiService.client.post<{
      token: string;
      user: Omit<User, 'token'>;
    }>('/login', loginData);
    const user = { ...data.user, token: data.token };
    this.setAuthorization(user.token);

    return user;
  }

  static async createUser(userData: CreateUser): Promise<User> {
    const { data } = await ApiService.client.post<User>('/user', userData);
    return data;
  }

  static async createCategory(
    CreateCategoryData: CreateCategory,
  ): Promise<Category> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.post<Category>(
      '/categories',
      { ...CreateCategoryData, userId: CreateCategoryData.userId },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return data;
  }

  static async getCategories(userId: string): Promise<Category[]> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.get<Category[]>('/categories', {
      params: { userId },
      headers: {
        Authorization: token,
      },
    });
    return data;
  }

  static async createTransaction(
    CreateTransactionData: CreateTransaction,
  ): Promise<Transaction> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.post<Transaction>(
      '/transactions',
      CreateTransactionData,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return data;
  }

  static async getTransactions({
    userId,
    title,
    categoryId,
    beginDate,
    endDate,
  }: TransactionsFilter): Promise<Transaction[]> {
    // Obter o token de autorização da configuração do axios
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.get<Transaction[]>(
      '/transactions',
      {
        params: {
          userId, // Inclua o userId nos parâmetros
          ...(title?.length && { title }),
          ...(categoryId?.length && { categoryId }),
          beginDate,
          endDate,
        },
        // Definir o cabeçalho de autorização com o token obtido
        headers: {
          Authorization: token,
        },
      },
    );

    return data;
  }

  static async updateTransactionDetails(transactionId: string, updateData: UpdateTransaction): Promise<Transaction> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await this.client.put<Transaction>(`/transactions/${transactionId}`, updateData, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
  
  static async getDashboard({
    beginDate,
    endDate,
  }: DashboardFilters): Promise<Dashboard> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.get<Dashboard>(
      '/transactions/deshboard',
      {
        params: {
          beginDate,
          endDate,
        },
        headers: {
          Authorization: token,
        },
      },
    );

    return data;
  }

  static async getFinancialEvaluation({
    year,
  }: FinancialEvolutionFilters): Promise<FinancialEvolution[]> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.get<FinancialEvolution[]>(
      '/transactions/financial-evolution',
      {
        params: {
          year,
        },
        headers: {
          Authorization: token,
        },
      },
    );
    return data;
  }

  static async sendMonthlyReport(
    email: string,
    month: number,
    year: number,
  ): Promise<any> {
    const token = this.client.defaults.headers.common['Authorization'];
    const { data } = await ApiService.client.get(
      `/transactions/monthly-report`,
      {
        params: { month, year, email },
        headers: {
          Authorization: token,
        },
      },
    );
    return data;
  }
}
