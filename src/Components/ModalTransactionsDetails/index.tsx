import { useState, useEffect } from 'react';
import {
  Content,
  Info,
  IconWrapper,
  Text,
  TextColor,
  Label,
  Modal,
} from './styles';
import { Dialog } from '../Dialog';

import { BsCalendar2Date } from 'react-icons/bs';
import { TbFileDescription } from 'react-icons/tb';
import { FaMoneyBill, FaTags } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/format-currency';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { color } from '../../Styles/color';

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

  useEffect(() => {
    setOpen(!!transactionDetails); // Concisely set open based on truthiness
  }, [transactionDetails]);

  const handleObservationClick = () => {
    setObservationModalOpen(true);
  };

  const handleCloseObservationModal = () => {
    setObservationModalOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} trigger={<></>}>
        {' '}
        {/* Improved trigger */}
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
              {' '}
              {/* Observation click handler */}
              <IconWrapper>
                <BiEditAlt size={20} />
              </IconWrapper>
              <Text>
                <label>Observação:</label>
                <span>
                  {transactionDetails.observation
                    ? transactionDetails.observation
                    : 'N/A'}
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

      {observationModalOpen && (
        <Modal visible={observationModalOpen}>
          <div>
            <h3>Observação</h3>
            <p>{transactionDetails.observation}</p>
            <button onClick={handleCloseObservationModal}>x</button>
          </div>
        </Modal>
      )}
    </>
  );
}
