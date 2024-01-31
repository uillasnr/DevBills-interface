import { useState, useEffect } from 'react';
import { Content, Info, IconWrapper, Text, TextColor, Label } from './styles';
import { Dialog } from '../Dialog';
import { api } from '../../services/Api';
import { BsCalendar2Date } from 'react-icons/bs';
import { TbFileDescription } from 'react-icons/tb';
import { FaMoneyBill, FaTags } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/format-currency';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { color } from '../../Styles/color';

type TransactionDetails = {
  _id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
  };
  observation?: string;
  type?: 'income' | 'expense';
};

export function ModalTransactionsDetails({
  transactionDetails,
}: {
  transactionDetails: TransactionDetails;
}) {
  const [open, setOpen] = useState(false);
  const [transactionDetailsData, setTransactionDetailsData] =
    useState<TransactionDetails | null>(null);

  useEffect(() => {
    if (transactionDetails) {
      setOpen(true);
    }
  }, [transactionDetails]);

  useEffect(() => {
    async function loadTransactionDetails() {
      try {
        if (transactionDetails && transactionDetails._id) {
          const response = await api.get(
            `/transactions/${transactionDetails._id}`,
          );
          const { data } = response;
          console.log('detalhes', data);
          setTransactionDetailsData(data);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da transação:', error);
      }
    }

    if (open && transactionDetails) {
      loadTransactionDetails();
    }
  }, [open, transactionDetails]);

  return (
    <Dialog open={open} onOpenChange={setOpen} trigger={<></>}>
      <Content>
        <h2>Detalhes da Transação</h2>

        <Info>
          <div>
            <IconWrapper>
              <TbFileDescription size={25} />
            </IconWrapper>
            <Text>
              <label>Título:</label>
              <p>{transactionDetailsData?.title}</p>
            </Text>
          </div>

          <div>
            <IconWrapper>
              <BsCalendar2Date size={20} />
            </IconWrapper>
            <Text>
              <label>Data:</label>
              <p>
                {transactionDetailsData
                  ? formatDate(transactionDetailsData.date)
                  : ''}
              </p>
            </Text>
          </div>

          <div>
            <IconWrapper>
              <FaTags size={20} />
            </IconWrapper>
            <Text>
              <label>Categoria:</label>
              <p>{transactionDetailsData?.category.title}</p>
            </Text>
          </div>

          <div>
            <IconWrapper>
              <FaMoneyBill size={20} />
            </IconWrapper>
            <Text>
              <label>Valor:</label>
              <p>
                {transactionDetailsData
                  ? formatCurrency(transactionDetailsData.amount)
                  : ''}
              </p>
            </Text>
          </div>

          <div>
            <IconWrapper>
              <BiEditAlt size={20} />
            </IconWrapper>
            <Text>
              <label>Observação:</label>
              <p>{transactionDetailsData?.observation ?? 'N/A'}</p>
            </Text>
          </div>

          <TextColor>
            <Label
              labelColor={
                transactionDetailsData?.type === 'income'
                  ? color.colors.primary
                  : color.colors.error
              }
            >
              {transactionDetailsData?.type === 'income'
                ? 'Receita:'
                : 'Despesa:'}
            </Label>

            {transactionDetailsData?.type === 'income' ? (
              <BiTrendingUp size={25} color={color.colors.primary} />
            ) : (
              <BiTrendingDown size={25} color={color.colors.error} />
            )}
          </TextColor>
        </Info>
      </Content>
    </Dialog>
  );
}
