export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateCategory = {
  userId: string;
  title: string;
  color: string;
  Icon?: string;
};

export type Category = {
  _id: string;
  userId: string;
  title: string;
  color: string;
  Icon: string;
};

export type CreateTransaction = {
  userId: string;
  categoryId: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  observation?: string;
  date: string;
};

export type Transaction = {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  observation?: string;
  date: Date;
  category: Category;
};

export type TransactionsFilter = {
  userId: string;
  title?: string;
  categoryId?: string;
  beginDate: string;
  endDate: string;
};

export type Balance = {
  _id: string | null;
  incomes: number;
  expenses: number;
  balance: number;
};

export type Expense = {
  _id: string;
  title: string;
  amount: number;
  color: string;
};

export type Dashboard = {
  balance: Balance;
  expenses: Expense[];
};

export type DashboardFilters = {
  beginDate: string;
  endDate: string;
};

export type FinancialEvolutionFilters = {
  year: string;
};

export type FinancialEvolution = {
  _id: [number, number];
  incomes: number;
  expenses: number;
  balance: number;
};
