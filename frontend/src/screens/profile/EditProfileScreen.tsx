import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { auth } from '../../firebase-config';
import { sendPasswordResetEmail  } from 'firebase/auth';
import { Navigate, useParams } from 'react-router-dom';
import { changeUsername, deleteUser } from '../../services/auth-service';

const EditProfileScreen = () => {
  const context = useContext(AppContext);

  const { id } = useParams();
  const isOwner = id == auth.currentUser?.uid ?? false;

  const email = context.user?.email;
  const [username, setUsername] = useState(context.user?.username ?? '');

  if (!isOwner) {
    return <Navigate to="/login" replace />;
  }

  const onSubmitChangeUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username == "") return;
    await changeUsername(context.user!, username!);
    context.setUser({...context.user!, username: username });
  }

  const sendChangePasswordEmail = () => {
    sendPasswordResetEmail(auth, context.user!.email).then(() => {
      alert("Se te ha enviado un correo para cambiar tu contraseña.");
    })
  }

  const onDeleteAccount = async () => {
    await deleteUser(context.user!);
  }

  return (
    <div>
      <input
        type="email"
        id="email"
        className='input-field w-100 mb-1'
        value={email}
        disabled={true}
      />
      <form onSubmit={onSubmitChangeUsername} className='flex flex-column g-1'>
        <input
          type="text"
          id="username"
          placeholder="Nombre de usuario"
          className='input-field w-100'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <div className='flex g-1'>
          <button type='submit' className='btn main ml-auto'>Cambiar nombre de usuario</button>
        </div>
      </form>
      <div className='flex g-1'>
          <button onClick={sendChangePasswordEmail} className='btn main-alt ml-auto mt-1'>Cambiar contraseña</button>
        </div>
        <div className='flex g-1'>
          <button onClick={onDeleteAccount} className='btn danger ml-auto mt-1'>Elminiar cuenta</button>
        </div>
    </div>
  )
}

export default EditProfileScreen