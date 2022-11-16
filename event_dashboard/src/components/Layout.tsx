import React, { useState } from "react";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import useFirebaseUser from "../hooks/useFirebaseUser";

const Layout = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { user } = useFirebaseUser();

  const logout = async () => {
    await signOut(auth);
    navigate("login");
  };

  const keyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      navigate("search?query=" + query);
      setQuery("");
    }
  };

  return (
    <div className="app">
      <div className="sidemenu">
        <div>
          <input
            type="text"
            id="search"
            placeholder="Buscar usuario"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={keyDown}
            value={query}
          />
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <AiFillHome /> Inicio
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={logout}
          style={{ marginTop: "auto" }}
          className="btn main-alt"
        >
          <AiOutlineLogout /> Cerrar sesión
        </button>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
