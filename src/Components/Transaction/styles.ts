import { styled } from 'styled-components';
import { color } from '../../Styles/color';

type ContentType = {
  $variant: 'income' | 'expense';
  $topColor: string;
};

const variantColorMap = {
  income: color.colors.success,
  expense: color.colors.error,
};

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding: 0.75rem;
  /*  border: 1px solid red; */

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${color.colors.neutral};
    line-height: 110%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 10px;
    background-color: ${color.colors.neutral};
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  strong {
    font-size: 1rem;
    font-weight: 500;
    color: ${color.colors.light};
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${color.colors.neutral};
  }
`;

export const Content = styled.div<ContentType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  strong {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => variantColorMap[props.$variant]};
  }

  span {
    font-size: 0.625rem;
    font-weight: 400;
    border: 1px solid ${(props) => props.$topColor};
    color: ${(props) => props.$topColor};
    padding: 0.25rem;
    border-radius: 0.125rem;
  }
`;
