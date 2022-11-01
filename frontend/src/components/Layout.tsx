import React, { useContext, useState } from 'react';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const Layout = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const logout = async () => {
        await signOut(auth);
        context.setUser(undefined);
        navigate('login');
    }

    const keyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            navigate('search?query=' + query);
            setQuery('');
        }
    }

    return (
        <div className='app'>
            <div className='sidemenu'>
                {/* <div>
                    USUARIO: {context.user?.id}
                </div> */}
                <div>
                    <input 
                        type="text" 
                        id="search" 
                        placeholder='Buscar usuario'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={keyDown}
                        value={query}
                    />
                </div>

                <nav>
                    <ul>
                        <li><NavLink end to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} ><AiFillHome /> Inicio</NavLink></li>
                        <li><NavLink to={`profile/${context.user?.id}`} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} ><FaUserAlt /> Perfil</NavLink></li>
                    </ul>
                </nav>

                <button onClick={logout} style={{ marginTop: 'auto' }} className='btn main-alt'><AiOutlineLogout /> Cerrar sesión</button>
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout