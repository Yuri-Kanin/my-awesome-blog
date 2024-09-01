import CreateNewArticle from "../CreateNewArticle";
import Header from "../Header";

function NewArticle() {
  return (
    <>
      <Header />
      <CreateNewArticle isEditArticle={false} />
    </>
  );
}

export default NewArticle;
