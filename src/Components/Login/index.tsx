import { Content, Overlay, Portal, Root, Conatiner, Text } from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import Imagem from '../../assets/png.png';

import { useForm } from 'react-hook-form';
import { UserData } from '../../Validators/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../Validators/schemas';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { login } = useFetchAPI();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const handleCadastrarClick = () => {
    navigate('/cadastro');
  };

  const onSubmit = useCallback(
    async (data: UserData) => {
      try {
        await login(data);
        navigate('/Home');
      } catch (error) {
        setError(
          'Credenciais inválidas. Por favor, verifique seu email e senha.',
        );
      }
    },
    [login, navigate],
  );

  return (
    <Root>
      <Portal>
        <Overlay className="AlertDialogOverlay" />
        <Content>
          <Conatiner>
            <Text>DevBill$</Text>
            <img src={Imagem} alt="Imagem" />
            <h3>Assuma o controle das suas finanças hoje mesmo.</h3>{' '}
          </Conatiner>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <div>
              <Input label="Email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
              <Input label="Senha" type="password" {...register('password')} />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <footer>
              <Button
                style={{ border: '1px solid #292a2d', borderRadius: '0.25rem' }}
                onClick={handleCadastrarClick}
                variant="outline"
                type="button"
              >
                Cadastrar
              </Button>

              <Button type="submit">Entrar</Button>
            </footer>
          </form>
        </Content>
      </Portal>
    </Root>
  );
}
