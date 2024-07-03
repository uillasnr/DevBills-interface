import styled from 'styled-components';
import { color } from '../../Styles/color';

type LabelProps = {
  labelColor: string;
};

export const Content = styled.div`
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.5rem;
    color: ${color.colors.white};
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;

  div {
    display: flex;
    margin-bottom: 10px;
  }
`;

export const TextColor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label<LabelProps>`
  font-weight: bold;
  margin-right: 8px;
  color: ${({ labelColor }) => labelColor};
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: ${color.colors.light};
  }

  p {
    margin-top: 2px;
    margin-bottom: 0;
    color: ${color.colors.neutral};
    font-size: 0.75rem;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 10px;
  align-items: center;
  svg {
    color: ${color.colors.light};
  }
`;

export const Close = styled.div`
  font-family: inherit;
  border: none;
  display: inline-flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;

  .hover {
    background-color: var(--violet-4);
  }
  .focus {
    box-shadow: 0 0 0 2px var(--violet-7);
  }
`;
