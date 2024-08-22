import { formatCurrency } from '../../utils/format-currency';
import { Container, Info, Content, ContainerItem } from './styles';
import { ModalTransactionsDetails } from '../ModalTransactionsDetails';
import { FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import { color } from '../../Styles/color';

type TransactionProps = {
  _id: string; 
  id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
    _id: string;
  };
  observation?: string;
  variant: 'income' | 'expense';
  categoryId: string; 
};

export function Transaction({
  _id, 
  id,
  title,
  date,
  amount,
  category,
  observation,
  variant = 'income',
}: TransactionProps) {
     const [selectedTransaction, setSelectedTransaction] = useState<TransactionProps | null>(null);

     const handleTransactionClick = (transaction: TransactionProps) => {
      setSelectedTransaction(transaction);
    };
    const categoryId = category._id;

  return (
    <Container>
      <ContainerItem
        key={id} 
        onClick={() => handleTransactionClick({  _id, id, title, date, amount, category, variant, observation,categoryId })}
      >
        <Info>
          <div className="Icon"> 
            <span>#{id.toString().padStart(4, '0')}</span>
            {observation && <FaEnvelope size={15} color={color.colors.primary} />}
          </div>

          <div>
            <strong>{title}</strong>
            <span>{date}</span>
          </div>
        </Info>
        <Content $variant={variant} $topColor={category.color}>
          <strong>{formatCurrency(amount)}</strong>
          <span>{category.title.toUpperCase()}</span>
        </Content>
      </ContainerItem>

      {selectedTransaction && (
  <ModalTransactionsDetails 
    transactionDetails={{
      ...selectedTransaction,
      categoryId: selectedTransaction.category._id,
      variant: selectedTransaction.variant  
    }} 
  />
)}

    </Container>
  );
}


