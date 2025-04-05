import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const useFetchDocument = (docCollection, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, docCollection, id);
        const res = await getDoc(docRef);
        if (!isCancelled) {
          if (res.exists()) {
            setDocument(res.data());
          } else {
            setError("Documento não encontrado.");
            console.log(error)
          }
        }
      } catch (error) {
        if (!isCancelled) setError(error.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [docCollection, id]);

  return { document, loading, error };
};

export default useFetchDocument;
