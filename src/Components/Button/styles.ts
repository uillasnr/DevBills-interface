import { css, styled } from 'styled-components';
import { color } from '../../Styles/color';

type ContainerProps = {
  $variant: 'default' | 'outline';
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 11rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$variant === 'default' ? color.colors.primary : 'transparent'};
  color: ${(props) =>
    props.$variant === 'default' ? color.colors.black : color.colors.primary};
  border: 0;
  padding: 0 0.75rem;
  transform: all 100ms;

  ${(props) =>
    props.$variant === 'outline' &&
    css`
      border: 1px solid ${color.colors.black};
    `}

  &:hover {
    background-color: ${color.colors.primaryDark};
  }
`;
