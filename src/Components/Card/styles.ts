import { color } from '../../Styles/color';
import { styled } from 'styled-components';

type ContainerProps = {
  variant: 'balance' | 'incomes' | 'expenses';
  title: string;
  amount: number;
};

const variantColorMap = {
  balance: color.colors.info,
  incomes: color.colors.success,
  expenses: color.colors.error,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  background-color: ${color.colors.dark};
  border-radius: 0.25rem;
  width: 100%;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    fill: ${(props) => variantColorMap[props.variant]};
  }

  span {
    font-size: 0.9rem;
    font-weight: 300;
    color: ${color.colors.neutral};
  }

  strong {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => variantColorMap[props.variant]};
  }
`;
