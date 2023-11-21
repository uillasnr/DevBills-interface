import {
  CurrencyCircleDollar,
  ArrowCircleUpRight,
  ArrowCircleDownRight,
} from '@phosphor-icons/react';
import { Container } from './styles';
import { formatCurrency } from '../../utils/format-currency';

type CardProps = {
  variant?: 'balance' | 'incomes' | 'expenses';
  title: string;
  amount: number;
};

const iconMap = {
  balance: <CurrencyCircleDollar />,
  incomes: <ArrowCircleUpRight />,
  expenses: <ArrowCircleDownRight />,
};

export function Card({ variant = 'balance', title, amount }: CardProps) {
  return (
    <Container variant={variant}>
      {iconMap[variant]}
      <span>{title}</span>
      <strong>{formatCurrency(amount)}</strong>
    </Container>
  );
}
