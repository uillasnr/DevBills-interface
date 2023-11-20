import { Button } from '../Button';
import { Title } from '../Title';
import { Filters, Header, Main, Section } from './styles';

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
          </Filters>
        </Section>
      </Main>
    </>
  );
}
