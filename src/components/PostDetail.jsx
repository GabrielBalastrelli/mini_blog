import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div  className={styles.container}>
      <div className={styles.container_img}>
        <img src={post.url} alt={post.title} />
     </div>
      <h2>{post.title}</h2>
      <p>Criado por {post.createdBy} </p>
      <div  className={styles.tags}>
        {post.tags.map((tag, index) => (
          <ul key={index}>
            <li key={index} >#{tag}</li>
          </ul>
        ))}
      </div>
      <Link className={styles.link} to={`/post/${post.id}`}>
        Ler
      </Link> 
    </div>
  );
};

export default PostDetail;
