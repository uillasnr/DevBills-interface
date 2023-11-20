import { InputMask } from '@react-input/mask';
import { Button } from '../Button';
import { Input } from '../Input';
import { Title } from '../Title';
import { Filters, Header, Main, Section, InputGrup } from './styles';
import { ButtonIcon } from '../Button-icon';

export function Home() {
  return (
    <>
      <Header>
        <h1 style={{ color: '#fff' }}>DevBill$</h1>
        <div>
          <Button>Nova Transação</Button>
          <Button>Nova Categoria</Button>
        </div>
      </Header>

      <Main>
        <Section>
          <Filters>
            <Title title="saldo" subtitle="Receitas e despesas no periodo" />
            <InputGrup>
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                placeholder="dd/mm/yyyy"
                variant="dark"
                label="Inicio"
              />
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                placeholder="dd/mm/yyyy"
                variant="dark"
                label="Fim"
              />
              <ButtonIcon />
            </InputGrup>
          </Filters>
        </Section>
      </Main>
    </>
  );
}
