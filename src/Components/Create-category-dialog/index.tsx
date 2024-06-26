import { useState, useCallback } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Title } from '../Title';
import { Input } from '../Input';
import { Container, Content } from './styles';

import { Select } from '../Select';
import { useFetchAPI } from '../../hooks/useFetchApi';

import { useForm } from 'react-hook-form';
import { createCategorySchema } from '../../Validators/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CeateCategoryData } from '../../Validators/types';

import { ColorCategory } from '../Color-Category';

export function CreateCategoryDialog() {
  const { createCategory, fetchCategories, userData } = useFetchAPI();
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CeateCategoryData>({
     defaultValues: {
      title: '',
      color: '',
    }, 
     resolver: zodResolver(createCategorySchema),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CeateCategoryData) => {
      if (!userData) {
        console.error('User data is missing. Cannot create category.');
        return;
      }
      const categoryData = {
        title: data.title,
        color: data.color,
        Icon: selectedIcon,
      };

      console.log('Category Data:', categoryData);
      await createCategory(categoryData);
      handleClose();
      await fetchCategories();
    },
    [handleClose, createCategory, fetchCategories, selectedIcon, userData],
  );


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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <div>
              <Input
                id="categoryName"
                label="Nome"
                placeholder="Nome da categoria..."
                {...register('title')}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
              <label>Cor</label>
              <ColorCategory
                {...register('color')}
                onSelectColor={(color) => setValue('color', color)}
              />
              {errors.color && <p>{errors.color.message}</p>}
            </div>
          </Content>

          <Select onSelectIcon={setSelectedIcon} />
 

          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>

            <Button type="submit" >
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
