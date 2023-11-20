import { styled } from 'styled-components';
import { color } from '../../Styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  h2 {
    font-size: 1.25rem;
    color: ${color.colors.white};
    font-weight: 700;
  }

  span {
    font-size: 0.875rem;
    color: ${color.colors.neutral};
    font-weight: 400;
  }
`;
