import { forwardRef, useState } from 'react';
import { Dialog } from '../Dialog';
import { Container, Content, ColorButton } from './styles';
import { Input } from '../Input';

type OnSelectColorType = (color: string) => void;

export const ColorCategory = forwardRef<HTMLDivElement, { onSelectColor: OnSelectColorType }>(({ onSelectColor }, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  const colors = [
    '#FF0000',
    '#FF9900',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#4B0082',
    '#800080',
    '#fff',
    '#FF00FF',
    '#F0E442',
    '#9966CC',
    '#00CED1',
    '#9400D3',
    '#FF1493',
    '#FFA500',
    '#00ED64',
    '#ADD8E6',
  ];

  const handleColorSelect = (selectedColor: string) => {
    setSelectedColor(selectedColor);
    onSelectColor(selectedColor);
    setOpen(false);
  };

  const placeholderText = selectedColor ? '' : 'Adicionar cor';

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Input
          id="categoryColor"
         /*  label="Cor" */
          style={{  backgroundColor: selectedColor }}
          onClick={() => setOpen(true)}
          placeholder={placeholderText}
          ref={ref as React.RefObject<HTMLInputElement>} // Ajuste o tipo aqui para corresponder à expectativa de HTMLInputElement
        />
      }
    >
      <Container>
        <h1>Selecione uma cor para a categoria</h1>
        <Content>
          {colors.map((color, index) => (
            <ColorButton
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </Content>
      </Container>
    </Dialog>
  );
});

