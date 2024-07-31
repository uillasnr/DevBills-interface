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
  position: relative;
  padding: 0 0.75rem;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${color.colors.neutral};
    line-height: 110%;
  }
`;
export const ContainerItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  margin: 5px 0px;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: 0.8;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${color.colors.black};

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  height: 3rem;

  .Icon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
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
    width: 9rem;
    margin-top: 0.5rem;
  }

  span {
    font-size: 0.8rem;
    font-weight: 400;
    color: ${color.colors.neutral};
  }

  @media screen and (max-width: 768px) {
    height: 0rem;
    div {
      width: 100%;
    }

    strong {
      margin-top: 0.5rem;
    }
  }
`;

export const Content = styled.div<ContentType>`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.25rem;

  strong {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => variantColorMap[props.$variant]};
    /*  color: ${color.colors.neutral}; */
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
