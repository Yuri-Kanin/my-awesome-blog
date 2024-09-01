/* eslint-disable global-require */
import PropTypes from "prop-types";
import Post from "../Post";
import classes from "./PostsWrapper.module.scss";

function PostsWrapper({
  posts,
  isFullPost,
  logInData,
  deleteAnArticle,
  likeDislikePost,
}) {
  const uniqueKey = require("unique-key");

  return (
    <ul className={classes.PostsWrapper}>
      {posts.map(post => (
        <li key={uniqueKey()} className={classes.PostItem}>
          <Post
            data={post}
            isFullPost={isFullPost}
            logInData={logInData}
            deleteAnArticle={deleteAnArticle}
            likeDislikePost={likeDislikePost}
          />
        </li>
      ))}
    </ul>
  );
}

PostsWrapper.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  isFullPost: PropTypes.bool.isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  deleteAnArticle: PropTypes.func.isRequired,
  likeDislikePost: PropTypes.func.isRequired,
};

export default PostsWrapper;
