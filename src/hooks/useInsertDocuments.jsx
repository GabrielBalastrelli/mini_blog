import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERT_DOC":
      return { loading: false, erro: null };
    case "ERROR":
      1;
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useInserDocuments = (docCoolection) => {
  const [response, dispacth] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancellBeforeDispacth = (action) => {
    if (!cancelled) {
      dispacth(action);
    }
  };

  const insertDocument = async (data) => {
    checkCancellBeforeDispacth({
      type: "LOADING",
    });
    const docInsert = { ...data, createdAt: Timestamp.now() };

    try {
      const doc = await addDoc(collection(db, docCoolection), docInsert);
      checkCancellBeforeDispacth({
        type: "INSERT_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancellBeforeDispacth({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    insertDocument,
    response,
  };
};

export default useInserDocuments;