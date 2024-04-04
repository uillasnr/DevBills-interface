import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  Category,
  Dashboard,
  FinancialEvolution,
  Transaction,
} from '../services/Api-types';
import { ApiService } from '../services/Api';
import {
  CeateCategoryData,
  CreateTransactionData,
  TransactionsFilterData,
  finacialEvolutionFilterData,
} from '../Validators/types';
import { formatDate } from '../utils/formatDate';

interface FetchApiProps {
  createCategory: (data: CeateCategoryData) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTransactions: (filters: TransactionsFilterData) => Promise<void>;
  fetchDashboard: (
    filters: Pick<TransactionsFilterData, 'beginDate' | 'endDate'>,
  ) => Promise<void>;
  fetchFinancialEvolution: (
    filters: finacialEvolutionFilterData,
  ) => Promise<void>;
  categories: Category[];
  transactions: Transaction[];
  dashboard: Dashboard;
  financialEvolution: FinancialEvolution[];
}

const FetchAPIContext = createContext<FetchApiProps>({} as FetchApiProps);

type FetchAPIProviderProps = {
  children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard);
  const [financialEvolution, setFinacialEvolution] = useState<
    FinancialEvolution[]
  >([]);

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    await ApiService.createTransaction({
      ...data,
      date: formatDate(data.date),
      amount: Number(data.amount.replace(/[^0-9]/g, ``)),
    });
  }, []);

  const createCategory = useCallback(async (data: CeateCategoryData) => {
    await ApiService.createCategory(data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const data = await ApiService.getCategories();
    setCategories(data);
  }, []);

  const fetchTransactions = useCallback(
    async (filters: TransactionsFilterData) => {
      const transactions = await ApiService.getTransactions({
        ...filters,
        beginDate: formatDate(filters.beginDate),
        endDate: formatDate(filters.endDate),
      });
      setTransactions(transactions);
    },
    [],
  );

  const fetchDashboard = useCallback(
    async ({
      beginDate,
      endDate,
    }: Pick<TransactionsFilterData, 'beginDate' | 'endDate'>) => {
      const dashboard = await ApiService.getDashboard({
        beginDate: formatDate(beginDate),
        endDate: formatDate(endDate),
      });
      setDashboard(dashboard);
    },
    [],
  );

  const fetchFinancialEvolution = useCallback(
    async ({ year }: finacialEvolutionFilterData) => {
      const financialEvolution = await ApiService.getFinancialEvaluation({
        year: year.padStart(4, '0'),
      });
      setFinacialEvolution(financialEvolution);
    },
    [],
  );

  return (
    <FetchAPIContext.Provider
      value={{
        dashboard,
        categories,
        transactions,
        financialEvolution,
        createCategory,
        fetchDashboard,
        fetchTransactions,
        fetchCategories,
        createTransaction,
        fetchFinancialEvolution,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  );
}

export function useFetchAPI(): FetchApiProps {
  return useContext(FetchAPIContext);
}
