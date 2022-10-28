import React, { useContext, useState } from 'react'
import CreateTweet from '../../components/CreateTweet'
import Tweet from '../../components/Tweet'
import { AppContext } from '../../context/AppContext';
import { RiPencilFill } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditProfileScreen = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const email = 'adri@mail.com';
  const [username, setUsername] = useState(context.username ?? '');
  const [pswd, setPswd] = useState('');
  const [pswdConf, setPswdConf] = useState('');

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const cancelEdit = () => navigate(-1);

  return (
    <div>
      <input
        type="email"
        id="email"
        className='input-field w-100 mb-1'
        value={email}
        disabled={true}
      />
      <form onSubmit={saveChanges} className='flex flex-column g-1'>
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
          placeholder="Nueva contraseña"
          className='input-field w-100'
          onChange={(e) => setPswd(e.target.value)}
          value={pswd}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className='input-field w-100'
          onChange={(e) => setPswdConf(e.target.value)}
          value={pswdConf}
        />
        <div className='flex g-1'>
          <button type='button' onClick={cancelEdit} className='btn main-alt ml-auto'>Cancelar</button>
          <button type='submit' className='btn main'>Guardar cambios</button>
        </div>
        
      </form>
    </div>
  )
}

export default EditProfileScreen