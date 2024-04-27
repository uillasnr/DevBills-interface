import {
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
  Conatiner,
  Text,
} from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import Imagem from '../../assets/png.png';
import { Headerr } from '../Header';
import { Cadastrar } from '../Cadastrar';
import { useForm } from 'react-hook-form';
import { UserData } from '../../Validators/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../Validators/schemas';
import { useFetchAPI } from '../../hooks/useFetchApi';
import { useCallback, useState } from 'react';

export function Login() {
  const { user } = useFetchAPI();
  const [Open, setOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: UserData) => {
      try {
        console.log('teste login', data);
        await user(data);
        handleClose();
      } catch (error) {
        setError(
          'Credenciais inválidas. Por favor, verifique seu email e senha.',
        );
      }
    },
    [handleClose, user],
  );

  return (
    <Root open={Open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button className="Button violet">
          <Headerr />
        </button>
      </Trigger>
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
              <Input label="Email"  {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
              <Input label="Senha" type="password" {...register('password')} />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <footer>
              <Trigger asChild>
                <Cadastrar />
              </Trigger>
              <Button type="submit">Entrar</Button>
            </footer>
          </form>
        </Content>
      </Portal>
    </Root>
  );
}
