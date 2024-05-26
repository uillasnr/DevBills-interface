import { styled } from 'styled-components';
import * as Avatar from '@radix-ui/react-avatar';
import { color } from '../../Styles/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #555555a1;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  height: 4rem;

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
  background-color: white;
  color: var(--violet-11);
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;
