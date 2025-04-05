import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";

const createRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const createUserRegister = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(user, {displayName : data.displayName})
    } catch (error) {
        let messageError;
        console.log(error.message);
        if(error.message.includes("auth/missing-password")){
            messageError = "Informe uma senha valida, com mais de 6 digitos!";    
        }else if(error.message.includes("email-already")){
            messageError = "Este email ja esta em uso!"
        }else{
            messageError = "Ocorreu um erro interno, por favor tente mais tarde!";
        }             
    

        setError(messageError);
    }
    setLoading(false);
  };

  useEffect(() => {
    return setCancelled(true);
  }, [])

  return {
    createUserRegister,
    error,
    loading,
    auth
  }
};

export default createRegister;