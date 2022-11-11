import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import '../../styles/login.scss';
import { User } from '../../models/user';
import { registerUser } from '../../services/auth-service';
import Loader from '../../components/Loader';

const RegisterScreen = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pswd, setPswd] = useState('');
  const [pswdConf, setPswdConf] = useState('');
  const [loading, setLoading] = useState(false);

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fbUser = await createUserWithEmailAndPassword(auth, email, pswd);
      const user: User = {
        id: fbUser.user.uid,
        email: fbUser.user.email!,
        username: username,
      };
      await registerUser(user);
      context.setUser(user);
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const gotoLogin = () => navigate('/login', { replace: true });

  return (
    <div className='login'>
      <form className='login-form' onSubmit={submitRegister}>
        <h1 className='text-center'>Twitter Reloaded</h1>
        <input
          type="email"
          id="email"
          placeholder="Correo"
          className='input-field w-100'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="text"
          id="username"
          placeholder="Nombre de usuario"
          className='input-field w-100'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className='input-field w-100'
          onChange={(e) => setPswd(e.target.value)}
          value={pswd}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className='input-field w-100'
          onChange={(e) => setPswdConf(e.target.value)}
          value={pswdConf}
          required
        />
        {loading
          ? <div className="btn main w-100 text-center"><Loader color={'white'} /></div>
          : <button type='submit' className='btn main'>Registrarse</button>
        }
        <button type='button' onClick={gotoLogin} className='btn link'>Ya tengo cuenta.</button>
      </form>
    </div>
  )
}

export default RegisterScreen