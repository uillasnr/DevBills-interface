import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';
import { useFetchAPI } from '../hooks/useFetchApi';

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userData, loading } = useFetchAPI();

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
