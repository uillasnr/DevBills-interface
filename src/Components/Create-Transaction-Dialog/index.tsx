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
import { api } from '../../services/Api';

type Category = {
  _id: number;
  title: string;
  color: string;
};

export function CreateTransactionDialog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
  
      const amount = parseFloat(data.amount.replace(/\D/g, '')); // Remover caracteres não numéricos

      // Formatando a data formato YYYY-MM-DD
      const dateParts = data.date.split('/');
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

      await api.post('/transactions', {
        title: data.title,
        amount: amount,
        categoryId: data.category,
        date: formattedDate,
        type: data.type,
      });
      handleClose();

      reset();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }

    handleClose();
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data); 

      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }

    loadCategories();
  }, []);

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

        <form onSubmit={onSubmit}>
          <Content>
            <InputGroup>
              <label>Categoria</label>
              <select {...register('category', { required: true })}>
                <option value="">Selecione uma categoria...</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.category && <span>Campo obrigatório</span>}
            </InputGroup>

            <Input
              label="Nome"
              placeholder="Nome da transação..."
              {...register('title', { required: true })}
            />
            {errors.title && <span>Campo obrigatório</span>}

            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
                {...register('amount', { required: true })}
              />
              {errors.value && <span>Campo obrigatório</span>}
            </InputGroup>

            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              placeholder="dd/mm/aaaa"
              variant="black"
              label="Data"
              {...register('date', { required: true })}
            />
            {errors.date && <span>Campo obrigatório</span>}

            <RadioForm>
              <RadioGroup>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  /* name="type" */ {...register('type')}
                />
                <label htmlFor="income">Receita</label>
              </RadioGroup>
              <RadioGroup>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  /* name="type" */ {...register('type')}
                />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
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
