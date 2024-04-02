export type CreateCategory = {
  title: string;
  color: string;
  Icon: string;
};

export type Category = {
  _id: string;
  title: string;
  color: string;
  Icon: string;
};

export type CreateTransaction = {
  categoryId: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
};

export type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  category: Category;
};

export type TransactionsFilter = {
  title?: string;
  categoryId?: string;
  beginDate: string;
  endDate: string;
}