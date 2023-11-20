import { styled } from 'styled-components';
import { color } from '../../Styles/color';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.25rem;
  background-color: ${color.colors.primary};
  border: 0;
  padding: 0;
  transition: all 100ms;

  &:hover {
    background-color: ${color.colors.primaryDark};
  }

  svg {
    fill: ${color.colors.black};
    height: 1.25rem;
    width: 3rem;
  }
`;
