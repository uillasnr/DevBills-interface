import { color } from '../../Styles/color';
import { Root, Trigger, Portal, Content, Close } from './styles';
import { IoMdClose } from 'react-icons/io';

export function ModalObservation({ observation }: { observation?: string }) {
  return (
    <Root>
      <Trigger asChild>
        <button>{observation ? observation : 'N/A'}</button>
      </Trigger>

      <Portal>
        {observation &&
          observation !== 'N/A' && ( // Verifica se a observação existe e não é 'N/A'
            <Content sideOffset={5}>
              <h3>Observação:</h3>
              <span>{observation ? observation : 'N/A'}</span>
              <Close className="PopoverClose" aria-label="Close">
                <IoMdClose size={20} color={color.colors.light} />
              </Close>
            </Content>
          )}
      </Portal>
    </Root>
  );
}
