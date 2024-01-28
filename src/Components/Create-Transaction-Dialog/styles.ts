import styled from 'styled-components';
import { color } from '../../Styles/color';
import { InputNumberFormat } from '@react-input/number-format';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  span{
    color: ${color.colors.error};
    font-size: 0.625rem;
    padding-left: 0.5rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    color: ${color.colors.white};
    font-size: 0.625rem;
  }

  select {
    height: 2.25rem;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    background-color: ${color.colors.black};
    color: ${color.colors.neutral};
    border: 1px solid transparent;
    transform: all 100ms;

    &:focus {
      border-color: ${color.colors.primary};
    }
  }
`;

export const CurrencyInput = styled(InputNumberFormat)`
  height: 2.25rem;
  background-color: ${color.colors.black};
  border: 0;
  border-radius: 0.25rem;
  padding: 0 0.75rem;
  color: ${color.colors.neutral};
  font-size: 1rem;
  width: 100%;
  border: 1px solid transparent;
  transform: all 100ms;

  &:focus {
    border-color: ${color.colors.primary};
  }

  &::placeholder {
    color: ${color.colors.neutral};
  }
`;

export const RadioForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${color.colors.primary};
  }

  label {
    color: ${color.colors.white};
    font-size: 0.875rem;
  }
`;
