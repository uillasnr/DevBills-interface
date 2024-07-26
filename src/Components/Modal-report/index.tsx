import { useState } from 'react';
import {
  Content,
  Overlay,
  Portal,
  Root,
  Container,
  Text,
  CloseButton,
} from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import { ApiService } from '../../services/Api';

interface ModalReportProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalReport({ setIsModalOpen }: ModalReportProps) {
  const [email, setEmail] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    try {
      const response = await ApiService.sendMonthlyReport(email, month, year);

      console.log('Relatório enviado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao enviar o relatório:', error);
    }

    closeModal();
  };

  return (
    <Root>
      <Portal>
        <Overlay className="AlertDialogOverlay" onClick={closeModal} />
        <Content onClick={(e) => e.stopPropagation()}>
          <Container>
            <Text>DevBill$</Text>
            <h3>Assuma o controle das suas finanças hoje mesmo.</h3>
            <p>
              Insira seu email abaixo para receber relatórios mensais de
              despesas diretamente na sua caixa de entrada.
            </p>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit}>Cadastrar</Button>
          </Container>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </Content>
      </Portal>
    </Root>
  );
}
