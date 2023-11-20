import { Container } from './styles';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'outline';
};

export function Button({ children, variant = 'default', ...props }: ButtonProps) {
  return <Container {...props} $variant={variant}>
    {children}
    </Container>;
}
