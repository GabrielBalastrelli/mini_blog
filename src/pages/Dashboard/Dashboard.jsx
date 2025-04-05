import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import useDeleteDocuments from '../../hooks/useDeleteDocuments';
import styles from "./Dashboard.module.css";

const Dashboard = () => {
   
  const {deleteDocument} = useDeleteDocuments("posts");

  const { user } = useAuthValue();
  const uid = user.uid;
  console.log(uid);
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
   return (
    <div className={styles.dashboard}>
      <div>
        <h2>DashBoard</h2>
      </div>
      {posts && posts.length === 0 ? (
        <div className={nopost}>
          <p>Ainda nao existe nenhum post!</p>
          <Link to="/create/post">Crie seu primeiro post</Link>
        </div>
      ) : (
        <>
          <p>Esses sao seus posts.</p>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Acoes</span>
          </div>
          {loading && <p>Aguarde...</p>} 
        </>
      )}
      {posts && posts.length !== 0 && (
        posts.map((post) => (
            <div className={styles.post_row}>
                <h3 className={styles.row}> {post.title}</h3>
                <div>
                  <Link className={styles.btn_acoes} to={`/post/${post.id}`} >Ver</Link>
                  <Link className={styles.btn_acoes} to={`/posts/edit/${post.id}`} >Editar</Link>
                  <button className={styles.btn_acoes}  onClick={() => deleteDocument(post.id)}>Excluir</button>
                </div>
            </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
