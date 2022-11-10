import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import '../../styles/login.scss';
import { getUserByUsername } from '../../services/auth-service';
import { User } from '../../models/user';

const LoginScreen = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [pswd, setPswd] = useState('');

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let credential;
      if (username.indexOf('@') == -1) {
        let dbUser = await getUserByUsername(username);
        credential = dbUser.email;
      } else {
        credential = username;
      }
      const fbUser = await signInWithEmailAndPassword(auth, credential, pswd);
      const user: User = {
        id: fbUser.user.uid,
        email: fbUser.user.email!,
        username: username,
      };
      context.setUser(user);
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const gotoRegister = () => navigate('/register', { replace: true });
  const gotoHome = () => navigate('/home', { replace: true });
  return (
    <div className='login'>
      <form className='login-form' onSubmit={submitLogin}>
        <h1 className='text-center'>Twitter Reloaded</h1>
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
        {loading
          ? <div className="btn main w-100 text-center"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
          : <button type='submit' onClick={gotoHome} className='btn main'>Iniciar sesión</button>}

        <button type='button' onClick={gotoRegister} className='btn link'>Crear una cuenta.</button>
      </form>
    </div>
  )
}

export default LoginScreen