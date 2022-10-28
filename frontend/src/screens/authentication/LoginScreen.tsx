import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../../styles/login.scss';

const LoginScreen = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [pswd, setPswd] = useState('');

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", JSON.stringify(username));
    context.setUsername(username);
    navigate("/");
  }

  const gotoRegister = () => navigate('/register', { replace: true });

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

        <button type='submit' className='btn main'>Iniciar sesión</button>

        <button type='button' onClick={gotoRegister} className='btn link'>Crear una cuenta.</button>
      </form>
    </div>
  )
}

export default LoginScreen