import { useState, useEffect } from "react";
import createRegister from "../../hooks/createRegister";
import styles from "./Register.module.css"
const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { createUserRegister, error: authError, loading } = createRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas nao conferem!");
      return;
    }

    const user = {
      displayName,
      email,
      password,
      confirmPassword,
    };

    const res = await createUserRegister(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
      return;
    }
  }, [authError]);

  return (
    <div>
      <div className={styles.wellcome}>
        <h1 className="wellcome_tittle">Bem Vindo ao nosso blog!</h1>
        <p className="wellcome_paragraph">
          Faca seu login para poder compartilhar suas historias!
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="displayName"
            placeholder="Insira seu nome de usuario..."
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
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
            placeholder="Insira uma Senha forte..."
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          Confirme sua senha:
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha..."
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <button>Cadastrar</button>}
        {loading && <button disabled>Aguarde...</button>}
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Register;
