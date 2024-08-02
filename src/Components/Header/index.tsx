import { CaretDown, CaretUp } from '@phosphor-icons/react';
import {
  Root,
  Image,
  Fallback,
  Container,
  Dropdown,
  DropdownContent,
} from './styles';
import { color } from '../../Styles/color';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ModalReport } from '../Modal-report';

export function CardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, userData } = useFetchAPI();
  const navigate = useNavigate();

  const handleLogoutAndNavigate = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <div>
        <h3>Olá, {userData?.name}</h3>
      </div>

      <Root className="AvatarRoot">
        <Image
          className="AvatarImage"
          src="https://tm.ibxk.com.br/2022/05/02/02121505592216.jpg"
          alt="Colm Tuite"
        />
        <Fallback className="AvatarFallback" delayMs={600}>
          CT
        </Fallback>
      </Root>

      <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        {isDropdownOpen ? (
          <CaretUp size={20} color={color.colors.light} />
        ) : (
          <CaretDown size={20} color={color.colors.light} />
        )}
      </div>

      {isDropdownOpen && (
        <Dropdown ref={dropdownRef}>
          <DropdownContent>
            <button onClick={openModal}>Relatório</button>
            <button onClick={handleLogoutAndNavigate}>Sair</button>
          </DropdownContent>
        </Dropdown>
      )}

      {isModalOpen && <ModalReport setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
}
