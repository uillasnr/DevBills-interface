import { useState, useCallback } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Title } from '../Title';
import { Input } from '../Input';
import { Container } from './styles';
import { api } from '../../services/Api';
import { Select } from '../Select';

type CategoryProps = {
  id: number;
  title: string;
  Icon: string;
  color: string;
};

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [NewCategory, setNewCategory] = useState<CategoryProps[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  console.log("teste",selectedIcon);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      // Obtém os valores dos inputs (você pode ajustar conforme necessário)
      const title = (
        document.getElementById('categoryName') as HTMLInputElement
      )?.value;
      const color = (
        document.getElementById('categoryColor') as HTMLInputElement
      )?.value;
  
      // Validação simples (você pode ajustar conforme necessário)
      if (!title || !color || !selectedIcon) {
        console.error('Por favor, preencha todos os campos.');
        return;
      }
  
      // Envia os dados para a API
      const response = await api.post('/categories', {
        title,
        color,
        Icon: selectedIcon, // Use o valor selecionado do estado
      });
  
      // Se a API retorna os dados da nova categoria, você pode atualizar o estado
      setNewCategory(response.data);
  
      // Fecha o diálogo
      handleClose();
    } catch (error) {
      console.error('Erro ao cadastrar nova categoria:', error);
    }
  }, [handleClose, selectedIcon]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma categoria para suas transações"
        />

        <form>
          <div>
            <Input
              id="categoryName"
              label="Nome"
              placeholder="Nome da categoria..."
            />
            <Input id="categoryColor" label="Cor" type="color" />
          </div>
          <Select  onSelectIcon={setSelectedIcon} />

          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit} type="button">
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
