import { ResponsiveBar } from '@nivo/bar';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import ptBRLocal from 'dayjs/locale/pt-br';
import { color } from '../../Styles/color';
import { formatCurrency } from '../../utils/format-currency';

const apiData = [
  {
    _id: {
      year: 2023,
      month: 1,
    },
    balance: 68900,
    incomes: 76343,
    expenses: 118399,
  },
  {
    _id: {
      year: 2023,
      month: 2,
    },
    balance: 82000,
    incomes: 90443,
    expenses: 80099,
  },
  {
    _id: {
      year: 2023,
      month: 3,
    },
    balance: 152000,
    incomes: 40443,
    expenses: 90099,
  },
  {
    _id: {
      year: 2023,
      month: 4,
    },
    balance: 12000,
    incomes: 20443,
    expenses: 10099,
  },
  {
    _id: {
      year: 2023,
      month: 5,
    },
    balance: 68900,
    incomes: 76343,
    expenses: 48399,
  },
  {
    _id: {
      year: 2023,
      month: 6,
    },
    balance: 82000,
    incomes: 190443,
    expenses: 80099,
  },
  {
    _id: {
      year: 2023,
      month: 7,
    },
    balance: 52000,
    incomes: 40443,
    expenses: 90099,
  },
  {
    _id: {
      year: 2023,
      month: 8,
    },
    balance: 12000,
    incomes: 20443,
    expenses: 10099,
  },
];

type ChartData = {
  month: string;
  saldo: number;
  Receitas: number;
  Gastos: number;
};

export function FinancialEvolutionBarChart() {
  const data = useMemo<ChartData[]>(() => {
    const chartData: ChartData[] = apiData.map((item) => ({
      month: dayjs(`${item._id.year}-${item._id.month}-01`).format('MMM'),
      saldo: item.balance,
      Receitas: item.incomes,
      Gastos: item.expenses,
    }));
    return chartData;
  }, []);

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
      /*  colors={{ scheme: 'category10' }} */
      colors={[color.colors.info, color.colors.primary, color.colors.error]}
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
