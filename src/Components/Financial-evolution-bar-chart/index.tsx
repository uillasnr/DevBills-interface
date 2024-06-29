import { useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import dayjs from 'dayjs';
import ptBRLocal from 'dayjs/locale/pt-br';
import { color } from '../../Styles/color';
import { formatCurrency } from '../../utils/format-currency';
import { FinancialEvolution } from '../../services/Api-types';

dayjs.locale(ptBRLocal);

type ChartData = {
  month: string;
  saldo: number;
  Receitas: number;
  Gastos: number;
};

type FinancialEvolutionBarChartProps = {
  financialEvolution?: FinancialEvolution[];
};

export function FinancialEvolutionBarChart({ financialEvolution }: FinancialEvolutionBarChartProps) {
  const [isFictitious, setIsFictitious] = useState(false);

  const allMonths = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => dayjs().month(index).format('MMM'));
  }, []);

  const data = useMemo<ChartData[]>(() => {
    if (financialEvolution?.length) {
      setIsFictitious(false);

      const chartData: ChartData[] = allMonths.map(month => {
        const foundData = financialEvolution.find(item => dayjs(`${item._id[0]}-${item._id[1]}-01`).format('MMM') === month);

        if (foundData) {
          return {
            month,
            saldo: foundData.balance,
            Receitas: foundData.incomes,
            Gastos: foundData.expenses,
          };
        } else {
          return {
            month,
            saldo: 0,
            Receitas: 0,
            Gastos: 0,
          };
        }
      });

      return chartData;
    }

    // Dados fictícios
    setIsFictitious(true);
    return allMonths.map(month => ({
      month,
      saldo: 0.5,
      Receitas: 1,
      Gastos: 2,
    }));
  }, [financialEvolution, allMonths]);

  const colors = isFictitious
    ? ['#C1C7C6', '#C1C7C6', '#C1C7C6'] 
    : [color.colors.info, color.colors.success, color.colors.error]; 

  return (
    <ResponsiveBar
      data={data}
      keys={['saldo', 'Receitas', 'Gastos']}
      indexBy="month"
      margin={{ bottom: 28, left: 80, top: 20, right: 150 }}
      padding={0.5}
      innerPadding={3}
      groupMode="grouped"
      enableLabel={false}
      enableGridX={false}
      axisLeft={{
        tickPadding: 15,
        tickSize: 0,
        format: formatCurrency,
      }}
      colors={colors}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
        },
        axis: {
          ticks: {
            text: {
              fill: color.colors.white,
            },
          },
        },
        tooltip: {
          container: {
            backgroundColor: color.colors.white,
            padding: 16,
            color: color.colors.black,
            fontSize: 12,
            fontFamily: 'Lexend',
            borderRadius: 4,
          },
        },
      }}
      valueFormat={formatCurrency}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 30,
          itemDirection: 'left-to-right',
          itemTextColor: '#fff',
          symbolSize: 15,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#999',
              },
            },
          ],
        },
      ]}
    />
  );
}
