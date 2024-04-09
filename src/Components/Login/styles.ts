import { styled } from 'styled-components';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { color } from '../../Styles/color';

export const Root = styled(AlertDialog.Root)``;

export const Portal = styled(AlertDialog.Portal)``;

export const Trigger = styled(AlertDialog.Trigger)`
  border: 0;
  background-color: transparent;
`;

export const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.98);
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

export const Content = styled(AlertDialog.Content)`
  background-color: ${color.colors.dark};
  border-radius: 0.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 60rem;
  padding: 1rem;
  align-items: center;

  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  img {
    width: 50%;
    height: auto;
  }

  h1 {
    font-size: 1.8rem;
    color: ${color.colors.primary};
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    margin-top: 1rem;
  }
  div {
    margin-bottom: 0.5rem;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 0.75rem;
  }

  span {
    color: ${color.colors.error};
    font-size: 0.625rem;
  }

  @keyframes contenShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img {
      width: 50%;
      order: -1; 
    }

    form {
      max-width: none;
    }
  }

`;
