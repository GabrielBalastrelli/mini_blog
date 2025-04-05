import {useState, useEffect} from "react";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";

const useLogin = () => {
    const auth = getAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const checkIfIsCancelled = () => {
        if(cancelled) return;
    };

    const login = (data) => {
        checkIfIsCancelled();
        setLoading(true);
        signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
            console.log("Login bem-sucedido:", user);
        }).catch((error) => {
            const erroCode = error.code;
            let systemError;
            console.log(error)
            if(erroCode === "auth/user-not-found"){
                systemError = "Usuario nao encontrado!";
            }else if(erroCode === "auth/wrong-password"){
                systemError = "Senha incorreta!";
            }else if(erroCode === "auth/invalid-credential"){
                systemError = "Credencias invalidas";
            }else {
                systemError = "Erro interno, pedimos desculpas, tente novamente mais tarde!";
            };
            setError(systemError);
        })

        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [auth])

    return {
        login,
        error, 
        loading,
    }; 
};

export default useLogin;