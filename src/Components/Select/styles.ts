import { styled } from 'styled-components';

export const InputSelect = styled.div`
display: inline-flex;
  width: 100%;
  

  select {
    height: 2.25rem;
    background-color: #04141c;
    border: 0;
    border-radius: 0%.25rem;
    padding: 0 0.75rem;
    color: #c1c7c6;
    font-size: 1rem;
    width: 50%;
    border: 1px solid transparent;
    transition: all 100ms;
  }

  ::placeholder {
    color: #c1c7c6;
  }

  div {
    width: 50%;
    height: 50%;
    color: white;
    text-align: start;
  }
  svg {
    width: 18%;
    height: 18%;
    padding: 0.2rem;
    margin-left: 4rem;
  }
`;
