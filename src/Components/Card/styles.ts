import { color } from '../../Styles/color';
import { styled } from 'styled-components';

type ContainerProps = {
  variant: 'balance' | 'incomes' | 'expenses';
};

const variantColorMap = {
  balance: color.colors.info,
  incomes: color.colors.success,
  expenses: color.colors.error,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
   flex-direction: column; 
 align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  background-color: ${color.colors.dark};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.50rem;
  width: 100%;
  height: 5rem;

  div{
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => variantColorMap[props.variant]};
  }

  span {
    font-size: 0.9rem;
    font-weight: 300;
    color: ${color.colors.white};
  }

  strong {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => variantColorMap[props.variant]};
  }
`;
