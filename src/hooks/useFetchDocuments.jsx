import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (cancelled) return;

      setLoading(true);

      let q;

      try {
        const docReferenc = await collection(db, docCollection);

        if (search) {
          q = await query(
            docReferenc,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(docReferenc, where("uid", "==", uid));
        } else {
          q = await query(docReferenc, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
         
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    documents,
    loading,
  };
};

export default useFetchDocuments;
