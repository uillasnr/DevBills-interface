import styled from 'styled-components';
import { color } from '../../Styles/color';

export const Root = styled.div`
  z-index: 9999;
`;

export const Portal = styled.div``;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms;

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: ${color.colors.primaryDark};
  border-radius: 0.5rem;
  max-width: 700px;
  margin: auto;

  h3 {
    font-size: 1.5rem;
    color: ${color.colors.light};
    font-weight: 400;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: ${color.colors.neutral};
    margin-bottom: 1.5rem;
  }
`;

export const Text = styled.h2`
  font-size: 2.5rem;
  color: ${color.colors.white};
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  background-color: ${color.colors.primaryDark};
  border-radius: 0.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 40rem;
  padding: 2rem;
  align-items: center;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${color.colors.light};
  cursor: pointer;

  
`;