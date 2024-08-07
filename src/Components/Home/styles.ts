import { styled } from 'styled-components';
import { color } from '../../Styles/color';

type CategoryBadgePros = {
  $color: string;
};

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  width: 99%;

  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

export const Main = styled.main`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  padding: 0 1.5rem 1.5rem 1.5rem;

  @media (max-width: 768px) {
    display: grid;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InputGrup = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 22.5rem;
  width: 100%;
  gap: 0.5rem;
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
`;

export const ChartContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  padding: 1rem;
  background-color: ${color.colors.dark};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const ChartContent = styled.div`
  height: 14.5rem;
`;

export const ChartAction = styled.div`
  display: flex;
  align-items: flex-end;
  width: 8rem;
  gap: 0.5rem;
`;

export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;

  .AsideButton {
    display: flex;
    gap: 0.5rem;
  }
`;

export const Aside = styled.aside`
  min-width: 22.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  background-color: ${color.colors.dark};

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SearchTransaction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TransactionGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0.75;
  overflow: auto;
  height: 38rem;

  /* Estilizando a barra de rolagem */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color.colors.black};
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${color.colors.primaryDark};
  }

  p {
    font-size: 0.875rem;
    color: ${color.colors.neutral};
    font-weight: 400;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-top: 18rem;
  }
`;

export const CategoryBadge = styled.span<CategoryBadgePros>`
  display: flex;
  font-size: row;
  align-items: center;
  gap: 0.25rem;

  font-size: 0.625rem;
  font-weight: 400;
  border: 1px solid ${(props) => props.$color};
  color: ${(props) => props.$color};
  padding: 0.25rem;
  border-radius: 0.125rem;
  cursor: pointer;

  svg {
    fill: ${color.colors.error};
    width: 0.875rem;
    height: 0.875rem;
  }
`;
