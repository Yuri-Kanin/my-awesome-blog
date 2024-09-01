import { useParams } from "react-router-dom";
import CurrentPost from "../CurrentPost";
import Header from "../Header";

function Articles() {
  const { articlesSlug } = useParams();
  return (
    <>
      <Header />
      <CurrentPost articlesSlug={articlesSlug} />
    </>
  );
}

export default Articles;
