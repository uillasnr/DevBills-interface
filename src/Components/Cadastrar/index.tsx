import { useCallback, useState } from 'react';
import { Content, Overlay, Portal, Root } from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import Imagem from '../../assets/png.png';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { useForm } from 'react-hook-form';
import { CreateUser } from '../../Validators/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '../../Validators/schemas';
import { useNavigate } from 'react-router-dom';

export function Cadastrar() {
  const { createUser } = useFetchAPI();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = useCallback(
    async (data: CreateUser) => {
      const { name, email, password, confirmPassword } = data;

      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      try {
        await createUser({ name, email, password, confirmPassword });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate('/login');
        }, 5000);
      } catch (error) {
        console.error(error);
        setError('Erro ao criar usuário');
      }
    },
    [createUser],
  );

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Root>
      <Portal>
        <Overlay className="AlertDialogOverlay" />

        <Content>
          <img src={Imagem} alt="Imagem" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastrar</h1>
            {error && <p>{error}</p>}
            <div>
              <Input label="Usuário" {...register('name')} />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
              <Input label="Email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
              <Input label="Senha" type="password" {...register('password')} />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div>
              <Input
                label="Confirmar Senha"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </div>
            <footer>
              <Button
                onClick={handleLoginClick}
                style={{
                  border: '1px solid #292a2d',
                  borderRadius: '0.25rem',
                }}
                variant="outline"
                type="button"
              >
                Já tenho cadastro
              </Button>

              <Button type="submit">Cadastrar</Button>
            </footer>
          </form>
        </Content>
      </Portal>
      {success && (
        <Portal>
          <Overlay className="AlertDialogOverlay" />
          <Content className="modal">
            <h2>Usuário criado com sucesso!</h2>
          </Content>
        </Portal>
      )}
    </Root>
  );
}
