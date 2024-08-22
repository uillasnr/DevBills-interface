import { useState, useEffect } from 'react';
import {
  Content,
  Info,
  IconWrapper,
  Text,
  TextColor,
  Label,
  Close,
  Input,
  EditButton,
} from './styles';
import { Dialog } from '../Dialog';
import { BsCalendar2Date } from 'react-icons/bs';
import { TbFileDescription } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { FaMoneyBill, FaTags } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { formatCurrency } from '../../utils/format-currency';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { color } from '../../Styles/color';
import { ModalObservation } from '../ModalObservation';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { UpdateTransaction } from '../../services/Api-types';
import dayjs from 'dayjs';
import { UpdateTransactionData } from '../../Validators/types';
import { UpdateTransactionSchema } from '../../Validators/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type TransactionDetails = {
  _id: string;
  id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
  };
  categoryId: string;
  observation?: string;
  variant: 'income' | 'expense';
};

export function ModalTransactionsDetails({ transactionDetails}: {transactionDetails: TransactionDetails;}) {
  const { updateTransaction, categories, fetchCategories, userData } = useFetchAPI();
  
  const [open, setOpen] = useState(false);
  const [observationModalOpen, setObservationModalOpen] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(transactionDetails.title);
  const [date, setDate] = useState(transactionDetails.date);
  const [amount, setAmount] = useState(transactionDetails.amount);
  const [category, setCategory] = useState(transactionDetails.category.title);
  const [categoryId, setCategoryId] = useState(transactionDetails.categoryId);
  const [type, setType] = useState<'income' | 'expense'>( transactionDetails.variant, );
  const [observation, setObservation] = useState( transactionDetails.observation || '', );

  const { register } = useForm<UpdateTransactionData>({
    resolver: zodResolver(UpdateTransactionSchema),
  });

  useEffect(() => {
    if (transactionDetails) {
      setOpen(true); 
      setTitle(transactionDetails.title);
      setDate(transactionDetails.date);
      setAmount(transactionDetails.amount);
      setCategory(transactionDetails.category.title);
      setCategoryId(transactionDetails.categoryId);
      setType(transactionDetails.variant);
      setObservation(transactionDetails.observation || '');
    } else {
      setOpen(false);
    }
  }, [transactionDetails]);

  const handleObservationClick = () => {
    setObservationModalOpen(true);
  };

  const handleCloseObservationModal = () => {
    setObservationModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    if (!userData) {
      console.error('User data is missing. Cannot update transaction.');
      return;
    }

    const adjustedAmount = type === 'expense' ? -amount : amount;

    const updateData: UpdateTransaction = {
      _id: transactionDetails._id,
      title,
      amount: adjustedAmount,
      type,
      categoryId,
      userId: userData._id,
      date: dayjs(date, 'DD/MM/YYYY').toISOString(),
      observation,
    };
    try {
      await updateTransaction(transactionDetails._id, updateData);
  
      setTimeout(() => {
        setIsEditing(false);
        setOpen(false);
        setObservationModalOpen(false);
      }, 300); 
    } catch (error) {
      console.error('Erro ao atualizar a transação:', error);
    }
  };

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleObservationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservation(e.target.value);
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
                {isEditing ? (
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <p>{title}</p>
                )}
              </Text>
            </div>

            <div>
              <IconWrapper>
                <BsCalendar2Date size={20} />
              </IconWrapper>
              <Text>
                <label>Data:</label>
                {isEditing ? (
                  <Input
                    value={date}
                    {...register('date', {
                      onChange: (e) => setDate(e.target.value),
                    })}
                  />
                ) : (
                  <p>{date}</p>
                )}
              </Text>
            </div>

            <div>
              <IconWrapper>
                <FaTags size={20} />
              </IconWrapper>
              <Text>
                <label>Categoria:</label>
                {isEditing ? (
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      const selectedCategoryId = e.target.value;
                      const selectedCategory = categories.find(
                        (cat) => cat._id === selectedCategoryId,
                      );
                      setCategory(
                        selectedCategory ? selectedCategory.title : '',
                      );
                      setCategoryId(selectedCategoryId);
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{category}</p>
                )}
              </Text>
            </div>

            <div>
              <IconWrapper>
                <FaMoneyBill size={20} />
              </IconWrapper>
              <Text>
                <label>Valor:</label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={amount}
                    {...register('amount', {
                      valueAsNumber: true,
                      onChange: (e) => setAmount(Number(e.target.value)),
                    })}
                  />
                ) : (
                  <p>{formatCurrency(amount)}</p>
                )}
              </Text>
            </div>

            <div onClick={handleObservationClick}>
              <IconWrapper>
                <BiEditAlt size={20} />
              </IconWrapper>

              <Text>
                <label>Observação:</label>
                {isEditing ? (
                  <Input
                    as="textarea"
                    value={observation}
                    onChange={handleObservationChange}
                  />
                ) : (
                  <span className="textObservation">
                    <ModalObservation
                      observation={observation}
                      isOpen={observationModalOpen}
                      onClose={handleCloseObservationModal}
                    />
                    {observation && observation.trim() !== ''
                      ? observation
                      : 'N/A'}
                  </span>
                )}
              </Text>
            </div>

            <TextColor>
              <Label
                labelColor={
                  isEditing
                    ? type === 'income'
                      ? color.colors.primary
                      : color.colors.error
                    : transactionDetails.variant === 'income'
                      ? color.colors.primary
                      : color.colors.error
                }
              >
                {isEditing
                  ? type === 'income'
                    ? 'Receita:'
                    : 'Despesa:'
                  : transactionDetails.variant === 'income'
                    ? 'Receita:'
                    : 'Despesa:'}
              </Label>

              {isEditing ? (
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as 'income' | 'expense')
                  }
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              ) : (
                <>
                  {type === 'income' ? (
                    <BiTrendingUp size={25} color={color.colors.primary} />
                  ) : (
                    <BiTrendingDown size={25} color={color.colors.error} />
                  )}
                </>
              )}
            </TextColor>
          </Info>
        </Content>

        <EditButton onClick={isEditing ? handleSaveChanges : handleEditClick}>
          {isEditing ? 'Salvar Alterações' : 'Editar'}
        </EditButton>
      </Dialog>
    </>
  );
}
