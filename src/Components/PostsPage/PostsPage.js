import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../Actions";
import ErrorIndicator from "../ErrorIndicator";
import Paginator from "../Paginator";
import PostsWrapper from "../PostsWrapper";
import Spinner from "../Spinner";
import classes from "./PostsPage.module.scss";

function PostPages({
  posts,
  articlesCount,
  currentPage,
  isFetching,
  getPostsThinkCreator,
  ChangePage,
  logInData,
  deleteAnArticle,
  isError,
  likeDislikePost,
}) {
  useEffect(() => {
    getPostsThinkCreator((currentPage - 1) * 5, logInData.token);
  }, [currentPage, getPostsThinkCreator, logInData.token]);

  if (isError) return <ErrorIndicator />;

  return (
    <article className={classes.PostPages}>
      {isFetching ? (
        <Spinner />
      ) : (
        <PostsWrapper
          posts={posts}
          isFullPost={false}
          logInData={logInData}
          deleteAnArticle={deleteAnArticle}
          likeDislikePost={likeDislikePost}
        />
      )}
      <Paginator
        currentPage={currentPage}
        articlesCount={articlesCount}
        ChangePage={ChangePage}
      />
    </article>
  );
}

const mapStateToProps = ({
  posts,
  articlesCount,
  currentPage,
  isFetching,
  logInData,
  isError,
}) => ({
  posts,
  articlesCount,
  currentPage,
  isFetching,
  logInData,
  isError,
});

const mapDispatchToProps = dispatch => {
  const { getPostsThinkCreator, ChangePage, deleteAnArticle, likeDislikePost } =
    bindActionCreators(actions, dispatch);
  return { getPostsThinkCreator, ChangePage, deleteAnArticle, likeDislikePost };
};

PostPages.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  articlesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getPostsThinkCreator: PropTypes.func.isRequired,
  ChangePage: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  deleteAnArticle: PropTypes.func.isRequired,
  likeDislikePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPages);
