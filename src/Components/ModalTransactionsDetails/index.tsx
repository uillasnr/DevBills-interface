import { useState, useEffect } from 'react';
import {
  Content,
  Info,
  IconWrapper,
  Text,
  TextColor,
  Label,
  Close,
} from './styles';
import { Dialog } from '../Dialog';

import { BsCalendar2Date } from 'react-icons/bs';
import { TbFileDescription } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { FaMoneyBill, FaTags } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/format-currency';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { color } from '../../Styles/color';
import { ModalObservation } from '../ModalObservation';

type TransactionDetails = {
  id: number;
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
  const [observationModalOpen, setObservationModalOpen] = useState(false);
console.log(observationModalOpen)
  useEffect(() => {
    setOpen(!!transactionDetails);
  }, [transactionDetails]);

  const handleObservationClick = () => {
    setObservationModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} trigger={<></>}>
        <Close onClick={() => setOpen(false)}>
          <IoMdClose size={20} color={color.colors.light} />
        </Close>
        <Content>
          <h2>Detalhes da Transação</h2>

          <Info>
            <div>
              <IconWrapper>
                <TbFileDescription size={25} />
              </IconWrapper>
              <Text>
                <label>Título:</label>
                <p>{transactionDetails.title}</p>
              </Text>
            </div>

            <div>
              <IconWrapper>
                <BsCalendar2Date size={20} />
              </IconWrapper>
              <Text>
                <label>Data:</label>
                <p>
                  {transactionDetails
                    ? formatDate(transactionDetails.date)
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
                <p>{transactionDetails.category.title}</p>
              </Text>
            </div>

            <div>
              <IconWrapper>
                <FaMoneyBill size={20} />
              </IconWrapper>
              <Text>
                <label>Valor:</label>
                <p>
                  {transactionDetails
                    ? formatCurrency(transactionDetails.amount)
                    : ''}
                </p>
              </Text>
            </div>

            <div onClick={handleObservationClick}>
              <IconWrapper>
                <BiEditAlt size={20} />
              </IconWrapper>
              <Text>
                <label>Observação:</label>
                <span>
                  <ModalObservation
                    observation={transactionDetails.observation}
                  />
                </span>
              </Text>
            </div>

            <TextColor>
              <Label
                labelColor={
                  transactionDetails.type === 'income'
                    ? color.colors.primary
                    : color.colors.error
                }
              >
                {transactionDetails.type === 'income' ? 'Receita:' : 'Despesa:'}
              </Label>

              {transactionDetails.type === 'income' ? (
                <BiTrendingUp size={25} color={color.colors.primary} />
              ) : (
                <BiTrendingDown size={25} color={color.colors.error} />
              )}
            </TextColor>
          </Info>
        </Content>
      </Dialog>
    </>
  );
}
