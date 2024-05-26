import { CaretDown } from '@phosphor-icons/react';
import { Root, Image, Fallback, Container } from './styles';
import { color } from '../../Styles/color';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { useNavigate } from 'react-router-dom';

export function CardHeader() {
  const { logout,userData} = useFetchAPI();
  const navigate = useNavigate();

  const handleLogoutAndNavigate = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <div>
      <h3>Olá, {userData?.name}</h3>
        <button onClick={handleLogoutAndNavigate}>Sair</button> 
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
      <div>
        <CaretDown size={20} color={color.colors.light} />
      </div>
    </Container>
  );
}
