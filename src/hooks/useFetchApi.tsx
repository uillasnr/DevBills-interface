import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Category,
  CreateCategory,
  CreateUser,
  Dashboard,
  FinancialEvolution,
  LoginData,
  Transaction,
  UpdateTransaction,
  User,
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
  login: (data: LoginData) => Promise<User>;
  logout: () => Promise<void>;
  createUser: (data: CreateUser) => Promise<User>;
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
  updateTransaction: (transactionId: string, updateData: UpdateTransaction) => Promise<void>;
  categories: Category[];
  transactions: Transaction[];
  dashboard: Dashboard;
  financialEvolution: FinancialEvolution[];
  userData: User | null;
  loading: boolean;
}

const FetchAPIContext = createContext<FetchApiProps>({} as FetchApiProps);

type FetchAPIProviderProps = {
  children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard);
  const [financialEvolution, setFinacialEvolution] = useState<
    FinancialEvolution[]
  >([]);

  const login = useCallback(async (data: LoginData) => {
    const user = await ApiService.login(data);
    setUserData(user);
    localStorage.setItem('userData', JSON.stringify(user));
    return user;
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      ApiService.setAuthorization(user.token);
    }
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('userData');
    setCategories([]);
    setTransactions([]);
    setDashboard({} as Dashboard);
    setFinacialEvolution([]);
    setUserData(null);
  }, []);

  const createUser = useCallback(async (data: CreateUser) => {
    const user = await ApiService.createUser(data);
    return user;
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionData) => {
      if (!userData) {
        console.error('User data is missing. Cannot create transaction.');
        return;
      }
      await ApiService.createTransaction({
        userId: userData._id,
        ...data,
        date: formatDate(data.date),
        amount: Number(data.amount.replace(/[^0-9]/g, ``)),
      });
     
    },
    [userData],
  );

  const createCategory = useCallback(
    async (data: CeateCategoryData) => {
      if (!userData) {
        console.error('User data is missing. Cannot create category.');
        return;
      }

      const categoryData: CreateCategory = {
        userId: userData._id,
        ...data,
      };

      await ApiService.createCategory(categoryData);
    },
    [userData],
  );

  const fetchCategories = useCallback(async () => {
    if (!userData) {
      console.error('User data is missing. Cannot fetch categories.');
      return;
    }
    const data = await ApiService.getCategories(userData._id);
    setCategories(data);
  
  }, [userData]);

  const fetchTransactions = useCallback(
    async (filters: TransactionsFilterData) => {
      if (!userData) {
        console.error('userId is required for fetching transactions');
        return;
      }
      
      const transactions = await ApiService.getTransactions({
        userId: userData._id,
        ...filters,
        beginDate: formatDate(filters.beginDate),
        endDate: formatDate(filters.endDate),
      });
 
      setTransactions(transactions);
    },
    [userData],
  );

  const updateTransaction = useCallback(
    async (transactionId: string, updateData: UpdateTransaction) => {
      if (!userData) {
        console.error('User data is missing. Cannot update transaction.');
        return;
      }
      
      const updatedTransaction = await ApiService.updateTransactionDetails(transactionId, updateData);
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === transactionId ? updatedTransaction : transaction
        )
      );
    },
    [userData]
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
        login,
        logout,
        createUser,
        loading,
        userData,
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
        updateTransaction
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  );
}

export function useFetchAPI(): FetchApiProps {
  return useContext(FetchAPIContext);
}
