import styled from 'styled-components';
import { color } from '../../Styles/color';

export const Container = styled.div`
  h1 {
    font-size: 0.875rem;
    color: #c1c7c6;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: center;
  }
`;
export const ColorButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  margin: 5px;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: ${color.colors.primaryDark};
  border-radius: 5px;
  height: 50%;
  width: 100%;
`;
