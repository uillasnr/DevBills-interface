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
  AsideContainer,
  CategoryBadge,
} from './styles';
import { ButtonIcon } from '../Button-icon';
import { Card } from '../Card';
import { Transaction } from '../Transaction';
import { CreateCategoryDialog } from '../Create-category-dialog';
import { CreateTransactionDialog } from '../Create-Transaction-Dialog';
import { CategoriesPieChart, CategoryProps } from '../Categories-pie-chart';
import { FinancialEvolutionBarChart } from '../Financial-evolution-bar-chart';
import { useForm } from 'react-hook-form';
import {
  TransactionsFilterData,
  finacialEvolutionFilterData,
} from '../../Validators/types';
import dayjs from 'dayjs';
import { TransactionsFilterSchema } from '../../Validators/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { X } from '@phosphor-icons/react';
import { CardHeader } from '../Header';

export function Home() {
  const transactionsFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: '',
      categoryId: '',
      beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
      endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
    },
    resolver: zodResolver(TransactionsFilterSchema),
  });

  const financialEvolutionFilterForm = useForm<finacialEvolutionFilterData>({
    defaultValues: {
      year: dayjs().get('year').toString(),
    },
  });

  const {
    transactions,
    fetchTransactions,
    fetchDashboard,
    dashboard,
    financialEvolution,
    fetchFinancialEvolution,
  } = useFetchAPI();

  useEffect(() => {
    const { beginDate, endDate } = transactionsFilterForm.getValues();
    fetchDashboard({ beginDate, endDate });

    fetchTransactions(transactionsFilterForm.getValues());
    fetchFinancialEvolution(financialEvolutionFilterForm.getValues());
  }, [
    fetchTransactions,
    transactionsFilterForm,
    fetchDashboard,
    fetchFinancialEvolution,
    financialEvolutionFilterForm,
  ]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const handleSelactCategory = useCallback(
    async ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color });
      transactionsFilterForm.setValue('categoryId', id);

      await fetchTransactions(transactionsFilterForm.getValues());
    },
    [transactionsFilterForm, fetchTransactions],
  );

  const handleDeselectCategory = useCallback(async () => {
    setSelectedCategory(null);
    transactionsFilterForm.setValue('categoryId', '');

    await fetchTransactions(transactionsFilterForm.getValues());
  }, [transactionsFilterForm, fetchTransactions]);

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      await fetchTransactions(data);
    },
    [fetchTransactions],
  );

  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      const { beginDate, endDate } = data;

      await fetchDashboard({ beginDate, endDate });
      await fetchTransactions(data);
      console.log(data);
      console.log(beginDate, endDate);
    },
    [fetchDashboard, fetchTransactions],
  );

  const onSubmitFinancialEvolution = useCallback(
    async (data: finacialEvolutionFilterData) => {
      await fetchFinancialEvolution(data);
    },
    [fetchFinancialEvolution],
  );

  return (
    <>
      <Header>
        <h1 style={{ color: '#fff' }}>DevBill$</h1>
        <CardHeader />
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
                error={
                  transactionsFilterForm.formState.errors.beginDate?.message
                }
                {...transactionsFilterForm.register('beginDate')}
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                placeholder="dd/mm/aaaa"
                variant="dark"
                label="Fim"
                error={transactionsFilterForm.formState.errors.endDate?.message}
                {...transactionsFilterForm.register('endDate')}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(onSubmitDashboard)}
              />
            </InputGrup>
          </Filters>

          <Balance>
            <Card
              title="Saldo"
              amount={dashboard?.balance?.balance || 0}
              variant="balance"
            />
            <Card
              title="Receitas"
              amount={dashboard?.balance?.incomes || 0}
              variant="incomes"
            />
            <Card
              title="Gastos"
              amount={dashboard?.balance?.expenses * -1 || 0}
              variant="expenses"
            />
          </Balance>

          <ChartContainer>
            <header>
              <Title title="Gastos" subtitle="Despesas por categoria" />
              {selectedCategory && (
                <CategoryBadge
                  $color={selectedCategory.color}
                  onClick={handleDeselectCategory}
                >
                  <X />
                  {selectedCategory.title.toUpperCase()}
                </CategoryBadge>
              )}
            </header>
            <ChartContent>
              <CategoriesPieChart
                expenses={dashboard.expenses}
                onClick={handleSelactCategory}
              />
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
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  placeholder="aaaa"
                  variant="black"
                  label="Ano"
                  {...financialEvolutionFilterForm.register('year')}
                />
                <ButtonIcon
                  onClick={financialEvolutionFilterForm.handleSubmit(
                    onSubmitFinancialEvolution,
                  )}
                />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart
                financialEvolution={financialEvolution}
              />
            </ChartContent>
          </ChartContainer>
        </Section>

        <AsideContainer>
          <div className="AsideButton">
            <CreateTransactionDialog />
            <CreateCategoryDialog />
          </div>
          <Aside>
            <header>
              <Title
                title="Transações"
                subtitle="Receitas e Gastos no periodo"
              />
              <SearchTransaction>
                <Input
                  placeholder="Procurar transação..."
                  variant="black"
                  {...transactionsFilterForm.register('title')}
                />
                <ButtonIcon
                  onClick={transactionsFilterForm.handleSubmit(
                    onSubmitTransactions,
                  )}
                />
              </SearchTransaction>
            </header>
            <TransactionGroup>
              {transactions?.length ? (
                transactions.map((item, index) => (
                  <Transaction
                    key={item._id}
                    id={index + 1}
                    amount={
                      item.type === 'expense' ? item.amount * -1 : item.amount
                    }
                    date={dayjs(item.date).add(3, 'hours').format('DD.MM.YYYY')}
                    category={{
                      title: item.category.title,
                      color: item.category.color,
                    }}
                    title={item.title}
                    variant={item.type}
                    observation={item.observation}
                  />
                ))
              ) : (
                <p>Sem transações para este mês.</p>
              )}
            </TransactionGroup>
          </Aside>
        </AsideContainer>
      </Main>
    </>
  );
}
