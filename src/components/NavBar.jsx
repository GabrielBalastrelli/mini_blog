import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user } = useAuthValue();
  const {logout} = useLogout();

  return ( 
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
            <>
                <li>
                    <NavLink to="/create/post"  className={({ isActive }) => (isActive ? styles.active : "")}> 
                        Criar Post
                     </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard"  className={({ isActive }) => (isActive ? styles.active : "")}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            </>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar-se
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
