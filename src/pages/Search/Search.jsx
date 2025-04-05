import useFetchDocuments from "../../hooks/useFetchDocuments";
import useSearch from "../../hooks/useSearch";
import PostDetail from "../../components/PostDetail";
import {Link} from "react-router-dom"
const Search = () => {
  const query = useSearch();

  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);
  console.log(posts);
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {posts && posts.length === 0 && (
        <div>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      )}
      {posts && posts.map((post,  ) => <PostDetail key={post.id} post={post} />)}
    </div>
  );
};

export default Search;
