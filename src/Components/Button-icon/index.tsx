import { MagnifyingGlass } from '@phosphor-icons/react';
import { Container } from './styles';
import { ComponentProps, forwardRef } from 'react';

type ButtonIconProps = ComponentProps<'button'>;

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ({ ...props }, ref) {
    return (
      <Container ref={ref} {...props}>
        <MagnifyingGlass />
      </Container>
    );
  },
);
