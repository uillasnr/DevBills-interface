import { Wallet, TrendUp, TrendDown } from '@phosphor-icons/react';
import { Container } from './styles';
import { formatCurrency } from '../../utils/format-currency';

type CardProps = {
  variant: 'balance' | 'incomes' | 'expenses';
  title: string;
  amount: number;
};

const iconMap = {
  balance: <Wallet />,
  incomes: <TrendUp />,
  expenses: <TrendDown />,
};

export function Card({ variant = "balance", title, amount }: CardProps) {
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

