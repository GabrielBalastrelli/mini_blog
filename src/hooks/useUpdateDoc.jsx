import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc as firebaseUpdateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useUpdateDoc = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, docCollection, uid);
      await firebaseUpdateDoc(docRef, data);

      checkCancelledBeforeDispatch({ type: "UPDATE_DOC" });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    updateDocument,
    response,
  };
};

export default useUpdateDoc;
