import { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {login, error : authError, loading} = useLogin();

    useEffect(() => {
        if(authError) {
            setError(authError);
        };
    }, [authError])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email && !password) {
        setError("Email e senha sao obrigatorios!");
    };

    const data = {
        email,
        password,
    };

    await login(data);
  };

  return (
    <div className={styles.main__box}>
      <div>
        <h1>Entre com a sua conta, e desfrute de tudo que podemos oferecer!</h1>
        <p>Faca login para curtir e compartilhar historias incriveis!</p>
      </div>
      <form onSubmit={handleSubmit}> 
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Insira seu email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="password"
            placeholder="Insira sua Senha..."
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button>Entrar</button>}
        {loading && <button disabled>Aguarde...</button>}
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Login;
