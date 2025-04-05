import useFetchDocuments from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import {useState} from "react";

const Home = () => {
    const {documents : posts, loading} = useFetchDocuments("posts")
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(tags) return navigate(`/search?q=${tags}`);
    };

     return (
       <div>
        <div>
            <h1>Bem Vindo!</h1>
            <p>Veja os post mais recentes, ou busque por tags de seu interesse</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.container_form}>
            <label>
                <input
                    type="text"
                    required
                    name="tags"
                    placeholder="Busque os seus assuntos favoritos..."
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                />
            </label>
            <button>Buscar</button>
        </form>
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div >
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => (<PostDetail  post={post}/>))}
       </div>
    );
}

export default Home;