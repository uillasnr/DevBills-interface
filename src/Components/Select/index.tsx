import React, { useState, ChangeEvent } from 'react';
import { CiForkAndKnife, CiPill, CiShoppingCart } from 'react-icons/ci';
import { InputSelect } from './styles';

interface Option {
  value: string;
  label: string;
  icon: React.ReactElement; // Altere o tipo de 'icon' para React.ReactElement
  iconName: string;
}

interface SelectProps {
    onSelectIcon: (value: string) => void;
}

const options: Option[] = [
  { value: 'Alimentação', label: '🍽 Alimentação', icon: <CiForkAndKnife />, iconName: 'CiForkAndKnife' },
  { value: 'Farmácia', label: '💊 Farmácia', icon: <CiPill />, iconName: 'CiPill' },
  { value: 'supermecado', label: '🛒 supermecado', icon: <CiShoppingCart />, iconName: 'CiShoppingCart' },
];

export const Select: React.FC<SelectProps> = ({ onSelectIcon }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedIconName = options.find((option) => option.value === selectedValue)?.iconName || '';
    onSelectIcon(selectedIconName);
   /*  console.log(selectedIconName); */
  };
  
  

  return (
    <InputSelect>
      <select
        name="category"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">Icon da categoria</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            <div>
              {option.label}
              <span>{option.icon}</span>
            </div>
          </option>
        ))}
      </select>

      {selectedOption && (
        <div>
          {options.find((option) => option.value === selectedOption)?.icon}
        </div>
      )}
    </InputSelect>
  );
};
