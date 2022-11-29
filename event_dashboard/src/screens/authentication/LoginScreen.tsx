import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import "../../styles/login.scss";
import { getUserByUsername } from "../../services/auth-service";
import Loader from "../../components/Loader";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [pswd, setPswd] = useState("");

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let credential;
      if (username.indexOf("@") === -1) {
        let dbUser = await getUserByUsername(username);
        credential = dbUser.email;
      } else {
        credential = username;
      }
      const res = await signInWithEmailAndPassword(auth, credential, pswd);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const gotoRegister = () => navigate("/register", { replace: true });
  // const gotoHome = () => navigate("/home", { replace: true });

  return (
    <div className="login">
      <form className="login-form" onSubmit={submitLogin}>
        <h1 className="text-center">Twitter Reloaded</h1>
        <input
          type="text"
          id="username"
          placeholder="Nombre de usuario"
          className="input-field w-100"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-field w-100"
          onChange={(e) => setPswd(e.target.value)}
          value={pswd}
          required
        />
        {loading ? (
          <div className="btn main w-100 text-center">
            <Loader color={"white"} />
          </div>
        ) : (
          <button type="submit" className="btn main">
            Iniciar sesión
          </button>
        )}

        <button type="button" onClick={gotoRegister} className="btn link">
          Crear una cuenta.
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
