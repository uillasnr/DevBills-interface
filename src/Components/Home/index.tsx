import { InputMask } from '@react-input/mask';
import { Input } from '../Input';
import { Title } from '../Title';
import {
  Filters,
  Header,
  Main,
  Section,
  InputGrup,
  Balance,
  ChartContainer,
  ChartContent,
  ChartAction,
  Aside,
  SearchTransaction,
  TransactionGroup,
} from './styles';
import { ButtonIcon } from '../Button-icon';
import { Card } from '../Card';
import { Transaction } from '../Transaction';
import { CreateCategoryDialog } from '../Create-category-dialog';
import { CreateTransactionDialog } from '../Create-Transaction-Dialog';
import { CategoriesPieChart } from '../Categories-pie-chart';
import { FinancialEvolutionBarChart } from '../Financial-evolution-bar-chart';

export function Home() {
  return (
    <>
      <Header>
        <h1 style={{ color: '#fff' }}>DevBill$</h1>
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>

      <Main>
        <Section>
          <Filters>
            <Title title="saldo" subtitle="Receitas e despesas no periodo" />
            <InputGrup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                placeholder="dd/mm/aaaa"
                variant="dark"
                label="Inicio"
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                placeholder="dd/mm/aaaa"
                variant="dark"
                label="Fim"
              />
              <ButtonIcon />
            </InputGrup>
          </Filters>

          <Balance>
            <Card title="saldo" amount={100000} />
            <Card title="saldo" amount={100000} variant="incomes" />
            <Card title="saldo" amount={100000} variant="expenses" />
          </Balance>

          <ChartContainer>
            <header>
              <Title title="Gastos" subtitle="Despesas por categoria" />
            </header>
            <ChartContent>
              <CategoriesPieChart />
            </ChartContent>
          </ChartContainer>

          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="dd/mm/aaaa"
                  replacement={{ a: /\d/ }}
                  placeholder="aaaa"
                  variant="black"
                  label="Ano"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>

        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no periodo" />
            <SearchTransaction>
              <Input placeholder="Procurar transação..." variant="black" />
              <ButtonIcon />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            <Transaction
              id={1}
              amount={2000}
              date="09/10/2023"
              category={{ title: 'Alimentação', color: '#fff' }}
              title="Mercado"
            />
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
