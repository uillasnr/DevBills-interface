import { useEffect, useState } from 'react';
import {
  Wallet,
  TrendUp,
  TrendDown,
} from '@phosphor-icons/react';
import { Container } from './styles';
import { formatCurrency } from '../../utils/format-currency';
import { api } from '../../services/Api';

type CardProps = {
  variant?: 'balance' | 'incomes' | 'expenses';
  title: string;
  amount: number;
};

const iconMap = {
  balance: <Wallet/>,
  incomes: <TrendUp />,
  expenses: <TrendDown />,
};

export function Card({ variant = 'balance', title, amount }: CardProps) {
  const [transactions, setTransactions] = useState<CardProps[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await api.get('transactions/deshboard');
        const { data } = response;
        console.log(data);
        setTransactions(data[variant]);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }

    loadTransactions();
  }, [variant]); 

  return (
    <Container variant={variant}>
      <span>{title}</span>
      <div> 
      <strong>{formatCurrency(amount)}</strong>
      {iconMap[variant]}
      </div>
    </Container>
  );
}
