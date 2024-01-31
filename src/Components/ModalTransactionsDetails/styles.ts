import styled from 'styled-components';
import { color } from '../../Styles/color';

type LabelProps = {
  labelColor: string;
};

export const Content = styled.div`
  padding: 20px;
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: ${color.colors.white};
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

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
