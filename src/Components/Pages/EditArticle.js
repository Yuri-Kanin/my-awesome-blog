import { useParams } from "react-router-dom";
import CreateNewArticle from "../CreateNewArticle";
import Header from "../Header";

function EditArticle() {
  const { articlesSlug } = useParams();
  return (
    <>
      <Header />
      <CreateNewArticle isEditArticle articlesSlug={articlesSlug} />
    </>
  );
}

export default EditArticle;
