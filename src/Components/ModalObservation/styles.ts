import styled from 'styled-components';
import { color } from '../../Styles/color';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: -10px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${color.colors.primaryDark};
  padding: 20px;
  border-radius: 10px;
  width: 90%; 
  max-width: 20rem; 
  text-align: center;
  color: #fff;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

export const Text = styled.h3`
  margin-bottom: 0.5rem; 
  text-align: center;
  font-size: 1.2rem;
  color: ${color.colors.light};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const StyledSpan = styled.span`
 color: ${color.colors.neutral};
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 300;
  text-align: center;
  display: block; 
  width: 100%; 
  max-width: 100%; 
  overflow-wrap: break-word; 
  word-break: break-word;
  white-space: normal; 
`;
