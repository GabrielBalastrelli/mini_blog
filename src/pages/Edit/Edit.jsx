import { useState, useEffect } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../hooks/useFetchDocument";
import useUpdateDoc from "../../hooks/useUpdateDoc";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [error, setFormError] = useState(null);

  const { id } = useParams();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const { document: post} = useFetchDocument("posts", id);

  useEffect(() => {
    if (post) {
      const tagsText = post.tags.join(", ");
      setTitle(post.title);
      setBody(post.body);
      setUrl(post.url);
      setTags(tagsText);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDoc("posts");

  const formatTags = (tags = string) => {
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    return tagsArray;
  };
  const checkValidateInfo = () => {
    if (!title || !url || !body || !tags) {
      setFormError("Preencha todos os campos antes de postar!");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    const validate = checkValidateInfo();

    if (validate) {
      return;
    }

    try {
      new URL(url);
    } catch (error) {
      setFormError("Insira uma URL valida!");
      return;
    }

    const tagsArray = formatTags(tags);

    updateDocument(id, {
      title: title,
      url: url,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div>
      <div>
        <h1>Crie seu Post!</h1>
        <p>Conte suas historias ao mundo</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Titulo:
          <input
            type="text"
            name="title"
            required
            placeholder="Edite o titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          Imagem:
          <input
            type="text"
            name="url"
            required
            placeholder="Nova imagem..."
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </label>
        <label>
          Conteudo:
          <textarea
            name="title"
            rows="5"
            cols="33"
            required
            placeholder="Edite o conteudo do seu post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as novas tags separadas por virgulas..."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {response.loading && <button disabled>...Aguarde</button>}
        {!response.loading && <button>Salvar</button>}
        {response.error && <span>{response.error}</span>}
        {error && <span>{error}</span>}
      </form>

      {error && <span>{error}</span>}
    </div>
  );
};

export default Edit;
