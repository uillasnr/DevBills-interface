import { formatCurrency } from '../../utils/format-currency';
import { Container, Info, Content,ContainerItem } from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../services/Api';
import { formatDate } from '../../utils/formatDate';

type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
  };
  variant?: 'income' | 'expense';
};


export function Transaction() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await api.get('/transactions');
        const { data } = response;
      /*   console.log(data); */
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }

    loadTransactions();
  }, []);

  return (
    <Container>
      {transactions.map((transaction) => (

        <ContainerItem key={transaction.id}>
          <Info >
           {/* <span>#{transaction.id.toString().padStart(4, '0')}</span> */}
           <span>#123</span>
            <div>
              <strong>{transaction.title}</strong>
              <span>{formatDate(transaction.date)}</span>
            </div>
          </Info>

          <Content $variant={transaction.variant} $topColor={transaction.category.color}>
            <strong>{formatCurrency(transaction.amount)}</strong>
            <span>{transaction.category.title.toUpperCase()}</span>
          </Content>
        </ContainerItem>

      ))}
    </Container>
  );
}

