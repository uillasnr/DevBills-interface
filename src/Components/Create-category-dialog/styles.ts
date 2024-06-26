import styled from 'styled-components';
import { color } from '../../Styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    color: ${color.colors.error};
    font-size: 0.625rem;
    padding-left: 0.5rem;
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
  width: 100%;
  gap: 0.5rem;

  label {
    color: ${color.colors.light};
    font-size: 0.625rem;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;
