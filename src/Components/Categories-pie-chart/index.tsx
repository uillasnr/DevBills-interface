import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import { color } from '../../Styles/color';
import { formatCurrency } from '../../utils/format-currency';

const apiData = [
  {
    _id: '1',
    title: 'Alimentação',
    amont: 30000,
    color: 'red',
  },
  {
    _id: '2',
    title: 'Compras',
    amont: 20000,
    color: '#FF0000',
  },
  {
    _id: '3',
    title: 'garagem',
    amont: 50000,
    color: '#ff33bb',
  },
  {
    _id: '4',
    title: 'Gasolina',
    amont: 90000,
    color: 'blue',
  },
  {
    _id: '5',
    title: 'celular',
    amont: 90000,
    color: '#3aff33',
  },
];

type ChartData = {
  id: string;
  label: string;
  externalId: string;
  value: number;
  color: string;
};

export function CategoriesPieChart() {
  const data = useMemo<ChartData[]>(() => {
    const chartData: ChartData[] = apiData.map((item) => ({
      id: item.title,
      label: item.title,
      externalId: item._id,
      value: item.amont,
      color: item.color,
    }));
    return chartData;
  }, []);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 24, right: 10, bottom: 24, left: -35 }}
      valueFormat={formatCurrency}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={6}
      borderWidth={1}
      activeOuterRadiusOffset = { 3 }
      colors={{ scheme: 'category10' }}
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
          itemWidth: 100,
          itemHeight: 30,
          itemTextColor: '#fff',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: 'circle',
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
