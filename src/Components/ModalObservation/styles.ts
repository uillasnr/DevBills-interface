import styled from 'styled-components';
import { color } from '../../Styles/color';
import * as Popover from '@radix-ui/react-popover';

export const Root = styled(Popover.Root)``;

export const Portal = styled(Popover.Portal)``;

export const Trigger = styled(Popover.Trigger)`
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
`;
export const Content = styled(Popover.Content)`
  box-shadow: 0 0 0 2px var(--violet-7);
  background-color: ${color.colors.black};
  border-radius: 10px;
  padding: 20px;
  width: 20rem;
  min-width: 20rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -90%);

  h3 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.2rem;
    color: ${color.colors.light};
  }
  span {
    color: ${color.colors.light};
    font-size: 0.875rem;
    font-weight: 400;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .PopoverClose {
    font-family: inherit;
    border: none;
    display: inline-flex;
    background-color: transparent;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 5px;
    right: 5px;
  }
  .PopoverClose:hover {
    background-color: var(--violet-4);
  }
  .PopoverClose:focus {
    box-shadow: 0 0 0 2px var(--violet-7);
  }
`;
export const Close = styled(Popover.Close)``;
