import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../Actions";
import PostsWrapper from "../PostsWrapper";
import Spinner from "../Spinner";
import classes from "./CurrentPost.module.scss";

function CurrentPost({
  articlesSlug,
  isFetching,
  fullPost,
  setFullPostThunkCreator,
  logInData,
  deleteAnArticle,
  likeDislikePost,
}) {
  useEffect(() => {
    setFullPostThunkCreator(articlesSlug);
  }, [articlesSlug, setFullPostThunkCreator]);

  return (
    <article className={classes.PostPages}>
      {isFetching ? (
        <Spinner />
      ) : (
        <PostsWrapper
          posts={fullPost}
          isFullPost
          logInData={logInData}
          deleteAnArticle={deleteAnArticle}
          likeDislikePost={likeDislikePost}
        />
      )}
    </article>
  );
}

const mapStateToProps = ({ isFetching, fullPost, logInData }) => ({
  isFetching,
  fullPost,
  logInData,
});

const mapDispatchToProps = dispatch => {
  const { setFullPostThunkCreator, deleteAnArticle, likeDislikePost } =
    bindActionCreators(actions, dispatch);
  return { setFullPostThunkCreator, deleteAnArticle, likeDislikePost };
};

CurrentPost.propTypes = {
  setFullPostThunkCreator: PropTypes.func.isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  deleteAnArticle: PropTypes.func.isRequired,
  articlesSlug: PropTypes.string.isRequired,
  fullPost: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  likeDislikePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPost);
