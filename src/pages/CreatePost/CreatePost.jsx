import { useState, useEffect } from "react";
import useInsertDocuments from "../../hooks/useInsertDocuments";
import { useAuthValue } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [error, setFormError] = useState(null);

  const { user } = useAuthValue();

  const navigate =  useNavigate();

  const { insertDocument, response } = useInsertDocuments("posts");

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

    const validate =  checkValidateInfo();

    if(validate){
        return;
    }
    
    try {
      new URL(url);
    } catch (error) {
      setFormError("Insira uma URL valida!");
      return;
    }

    const tagsArray = formatTags(tags);

    insertDocument({
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
            placeholder="Coloque um titulo chamativo..."
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
            placeholder="Insira a url da sua imagem..."
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
            placeholder="Coloque um titulo chamativo..."
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
            placeholder="Insira as tags separadas por virgulas..."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {response.loading && <button disabled>...Aguarde</button>}
        {!response.loading && <button>Postar</button>}
      </form>
      {response.error && <span>{response.error}</span>}
      {error && <span>{error}</span>}
    </div>
  );
};

export default CreatePost;
