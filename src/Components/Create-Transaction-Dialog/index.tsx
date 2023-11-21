import { useState, useCallback } from 'react';
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

export function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    handleClose();
  }, [handleClose]);

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

        <form>
          <Content>
            <InputGroup>
              <label>Categoria</label>
              <select>
                <option value="null">Selecione uma categoria...</option>
              </select>
            </InputGroup>

            <Input label="Nome" placeholder="Nome da transação..." />

            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
              />
            </InputGroup>

            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              placeholder="dd/mm/aaaa"
              variant="black"
              label="Data"
            />

            <RadioForm>
              <RadioGroup>
                <input type="radio" id="income" value="income" name="type" />
                <label htmlFor="income">Receita</label>
              </RadioGroup>
              <RadioGroup>
                <input type="radio" id="expense" value="income" name="type" />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
            </RadioForm>

            <footer>
              <Button onClick={handleClose} variant="outline" type="button">
                Cancelar
              </Button>
              <Button onClick={onSubmit} type="button">
                Cadastrar
              </Button>
            </footer>
          </Content>
        </form>
      </Container>
    </Dialog>
  );
}
