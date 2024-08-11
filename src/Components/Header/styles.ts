import { styled } from 'styled-components';
import * as Avatar from '@radix-ui/react-avatar';
import { color } from '../../Styles/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${color.colors.primaryDark};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  height: 4rem;
  position: relative;


  h3 {
    font-size: 0.875rem;
    color: ${color.colors.light};
    font-weight: 400;
  }
`;

export const Root = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: var(--black-a3);
`;

export const Image = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const Fallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.colors.neutral};
  color: var(--violet-11);
  font-size: 15px;
  line-height: 1;
  font-weight: 500;


`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 50%; 
  left: 10;
  right: 0;
  background: ${color.colors.primaryDark};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

export const DropdownContent = styled.div`
  padding: 1rem;
  text-align: center;
  flex-direction: column;

  button {
    font-size: 0.875rem;
    color:${color.colors.neutral};
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: ${color.colors.white};
      background: none;
      border: none;
    }
  }
`;


