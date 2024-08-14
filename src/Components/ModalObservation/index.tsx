import { Overlay, CloseButton, ModalContainer,Text, StyledSpan } from './styles';

interface ModalObservationProps {
  observation?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalObservation({ observation, isOpen, onClose }: ModalObservationProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Text>Observação:</Text>
        < StyledSpan>{observation}</StyledSpan>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalContainer>
    </Overlay>
  );
}
