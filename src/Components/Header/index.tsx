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

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  return (
    <Container>
      <div>
        <h3>Olá, {userData?.name}</h3>
      </div>

      <Root className="AvatarRoot">
        <Image
          className="AvatarImage"
          src=""
          alt="Avatar"
          style={{ display: 'none' }}
        />
        <Fallback className="AvatarFallback" delayMs={600}>
          {userData?.name && getInitials(userData.name)}
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
