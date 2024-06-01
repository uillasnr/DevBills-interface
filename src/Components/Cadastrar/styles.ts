import { styled } from 'styled-components';

import { color } from '../../Styles/color';

export const Root = styled.div``;

export const Portal = styled.div`
  .modal {
    height: 5rem;
    width: 20rem;
    background: darkgray;
  }
  h2 {
    text-align: center;
    font-size: 1.2rem;
  }
`;

export const Trigger = styled.div`
  border: 0;
  background-color: transparent;
`;

export const Overlay = styled.div`
  background-color:#2b2b2b;
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

export const Content = styled.div`
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
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.35);
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
    gap: 0.5rem;
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
