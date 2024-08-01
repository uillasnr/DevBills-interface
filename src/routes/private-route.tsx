import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useFetchAPI } from '../hooks/useFetchApi';
import { ApiService } from '../services/Api';

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userData, loading } = useFetchAPI();
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  // Inicialize o ApiService com a função de redirecionamento
  useEffect(() => {
    ApiService.init(redirectToLogin);
  }, [redirectToLogin]);

  if (loading) {
    // Renderiza um indicador de carregamento enquanto o estado do usuário está sendo inicializado
    return <div>Loading...</div>;
  }

  if (!userData) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver autenticado, renderiza os componentes filhos
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
