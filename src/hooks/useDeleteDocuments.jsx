import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETE_DOC":
      return { loading: false, error: null }; // Corrigido "erro" para "error"
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useDeleteDocuments = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      console.log("Tentando deletar:", doc(db, docCollection, id));
      
      await deleteDoc(doc(db, docCollection, id)); // Agora está correto

      checkCancelBeforeDispatch({ type: "DELETE_DOC" });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
      console.error("Erro ao deletar documento:", error);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};

export default useDeleteDocuments;
