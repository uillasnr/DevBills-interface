import styled from 'styled-components';
import { color } from '../../Styles/color';

type LabelProps = {
  labelColor: string;
};

interface ModalProps {
  visible: boolean; // Definição da propriedade visible
}

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

  span  {
    margin-top: 2px;
    margin-bottom: 0;
    color: ${color.colors.neutral};
    font-size: 0.75rem;
    white-space: nowrap;
    max-width: 15ch;
    height: 1.5rem;
    text-align: center;
    padding: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: ${color.colors.black};
    border-radius: 0.5rem;
    border: solid 1px ${color.colors.white};
border-style: dotted;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 10px;
  align-items: center;
  svg {
    color: ${color.colors.light};
  }
`;

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com opacidade */
  display: ${({ visible }) => (visible ? 'flex' : 'none')}; // Exibir ou ocultar o modal com base na propriedade visible
  justify-content: center;
  align-items: center;
  z-index: 9999; /*index alto para garantir que o modal apareça acima de outros elementos */

  div {
    background-color: ${color.colors.white};
    border-radius: 10px;
    padding: 20px;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto; /* Adiciona uma barra de rolagem vertical caso o conteúdo seja maior que a altura máxima */
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: ${color.colors.dark}; /* Cor do texto */
  }

  p {
    color: ${color.colors.dark}; /* Cor do texto */
    margin-bottom: 20px;
  }

  button {
    background-color: ${color.colors.primary}; /* Cor de fundo do botão */
    color: ${color.colors.white}; /* Cor do texto do botão */
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: ${color.colors.primaryDark}; /* Cor de fundo do botão ao passar o mouse */
  }
`;
