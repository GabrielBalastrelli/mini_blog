import { getAuth, signOut } from "firebase/auth";
import {useState} from "react";

const useLogout = () => {
    const [error, setError] = useState(null);

    const logout = () => {

        const auth = getAuth();

        signOut(auth).then(() => {
            return;
        }).catch((error) => {
            setError(error.message);
        }) 
    };

    return {
        logout,
        error,
    }
};

export default useLogout;