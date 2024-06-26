import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Title } from '../Title';
import { Input } from '../Input';
import {
  Container,
  Content,
  CurrencyInput,
  InputGroup,
  RadioForm,
  RadioGroup,
} from './styles';
import { InputMask } from '@react-input/mask';

import { CreateTransactionData } from '../../Validators/types';
import { createTransactionSchema } from '../../Validators/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchAPI } from '../../hooks/useFetchApi';

export function CreateTransactionDialog() {
  const { categories, fetchCategories, createTransaction } = useFetchAPI();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(createTransactionSchema),
  });

  const handleClose = useCallback(() => {
    reset();
    setOpen(false);
  }, [reset]);

  const onSubmit = useCallback(
    async (data: CreateTransactionData) => {
      await createTransaction(data);
      await fetchCategories();
      handleClose();
    },
    [handleClose, createTransaction, fetchCategories],
  );

  //Renderiza as categorias
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova transação</Button>}
    >
      <Container>
        <Title
          title="Nova transação"
          subtitle="Crie uma transação para seu controle financeiro"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <InputGroup>
              <label>Categoria</label>
              <select {...register('categoryId')}>
                <option value="">Selecione uma categoria...</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.categoryId && <span>{errors.categoryId.message}</span>}
            </InputGroup>

            <Input
              label="Nome"
              placeholder="Nome da transação..."
              {...register('title')}
            />
            {errors.title && <span>{errors.title?.message}</span>}

            <Input
              label="Observação"
              placeholder="Adicionar observação..."
              {...register('observation')}
            />

            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
                {...register('amount')}
              />
              {errors.amount && <span>{errors.amount.message}</span>}
            </InputGroup>

            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              placeholder="dd/mm/aaaa"
              variant="black"
              label="Data"
              {...register('date')}
            />
            {errors.date && <span>{errors.date.message}</span>}

            <RadioForm>
              <RadioGroup>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  {...register('type')}
                />
                <label htmlFor="income">Receita</label>
              </RadioGroup>

              <RadioGroup>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  {...register('type')}
                />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
              {errors.type && <span>{errors.type.message}</span>}
            </RadioForm>

            <footer>
              <Button onClick={handleClose} variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit">Cadastrar</Button>
            </footer>
          </Content>
        </form>
      </Container>
    </Dialog>
  );
}
