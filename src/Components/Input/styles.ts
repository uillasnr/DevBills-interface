import { styled } from 'styled-components';
import { color } from '../../Styles/color';

type ContainerProps = {
  $variant: 'black' | 'dark';
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;

  label {
    color: ${color.colors.white};
    font-size: 0.625rem;
  }

  input {
    height: 2.25rem;
    background-color: ${(props) => color.colors[props.$variant]};
    border: 0;
    border-radius: 0.25rem;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
    padding: 0 0.75rem;
    color: ${color.colors.neutral};
    font-size: 1rem;
    width: 100%;
    border: 1px solid transparent;
    transition: all 100ms;

    &:focus {
      border-color: ${color.colors.primary};
    }

    &::placeholder {
      color: ${color.colors.neutral};
    }
  }
`;
