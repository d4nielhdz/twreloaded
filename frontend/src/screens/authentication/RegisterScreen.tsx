import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../../styles/login.scss';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pswd, setPswd] = useState('');
  const [pswdConf, setPswdConf] = useState('');

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", JSON.stringify(username));
    context.setUsername(username);
    navigate("/");
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

        <button type='submit' className='btn main'>Registrarse</button>

        <button type='button' onClick={gotoLogin} className='btn link'>Ya tengo cuenta.</button>
      </form>
    </div>
  )
}

export default RegisterScreen