import { Content, Overlay, Portal, Root, Trigger } from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import Imagem from '../../assets/png.png';
import { Headerr } from '../Header';
import { Cadastrar } from '../Cadastrar';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../Validators/types';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { loginSchema } from '../../Validators/schemas';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema), 
  });

  const onSubmit = (data: LoginData) => {
   
    console.log(data);
  };

  return (
    <Root>
      <Trigger asChild>
        <button className="Button violet">
          <Headerr />
        </button>
      </Trigger>
      <Portal>
        <Overlay className="AlertDialogOverlay" />
        <Content>
          <img src={Imagem} alt="Imagem" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <div>
              <Input label="Email" {...register('username')} />
              {errors.username && <span>{errors.username.message}</span>}
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
