import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../Components/Home';
import { Login } from '../Components/Login';
import { Cadastrar } from '../Components/Cadastrar';
import PrivateRoute from './private-route';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastrar />} />
        <Route path="/Home" element={ <PrivateRoute><Home /></PrivateRoute> } />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
