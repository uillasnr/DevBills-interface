import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import { color } from '../../Styles/color';
import { formatCurrency } from '../../utils/format-currency';
import { Expense } from '../../services/Api-types';

export type CategoryProps = {
  id: string;
  title: string;
  color: string;
};

type ChartData = {
  id: string;
  label: string;
  externalId: string;
  value: number;
  color: string;
};

type CategoriesPieChartProps = {
  onClick: (category: CategoryProps) => void;
  expenses?: Expense[];
};

export function CategoriesPieChart({
  onClick,
  expenses,
}: CategoriesPieChartProps) {
  const customColors = useMemo(() => {
    if (expenses?.length) {
      return expenses.map((item) => item.color);
    }
    return ['#C1C7C6'];
  }, [expenses]);

  const data = useMemo<ChartData[]>(() => {
    if (expenses?.length) {
      return expenses.map((item) => ({
        id: item.title,
        label: item.title,
        externalId: item._id,
        value: item.amount,
        color: item.color,
      }));
    }
    return [
      {
        id: 'Adicione Despesas',
        label: 'Adicione Despesas',
        externalId: '1',
        value: 1,
        color: '#b90000',
      },
      {
        id: 'Sem Despesa ',
        label: 'Sem Despesas',
        externalId: '2',
        value: 3,
        color: '#454547',
      },
    ];
  }, [expenses]);

  return (
    <ResponsivePie
      onClick={({ data }) =>
        onClick({
          id: data.externalId,
          title: data.id,
          color: data.color,
        })
      }
      data={data}
      margin={{ top: 24, right: 10, bottom: 24, left: -35 }}
      valueFormat={formatCurrency}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={6}
      borderWidth={1}
      activeOuterRadiusOffset={3}
      colors={customColors}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      theme={{
        text: {
          fontSize: 12,
          fontFamily: 'Lexend',
        },
        tooltip: {
          container: {
            backgroundColor: color.colors.white,
            padding: 16,
            color: color.colors.black,
            fontFamily: 'Lexend',
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsThickness={1}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 4]],
      }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 120,
          itemHeight: 30,
          itemTextColor: '#C1C7C6',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#fff',
              },
            },
          ],
        },
      ]}
    />
  );
}
