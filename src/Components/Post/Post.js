/* eslint-disable no-unused-vars */
import { Popconfirm } from "antd";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import Tag from "../Tag";
import classes from "./Post.module.scss";

function Post({
  data,
  isFullPost,
  logInData,
  deleteAnArticle,
  likeDislikePost,
}) {
  const [isPostDelete, confirmToPostDelete] = useState(false);
  const redirect = useNavigate();
  const [like, addLike] = useState(data.favorited);
  const [likeCount, changeLikeCount] = useState(data.favoritesCount);

  return (
    <div className={classes.Post}>
      <div className={classes.Title}>
        <Link to={`/articles/${data.slug}`}>{data.title}</Link>
      </div>
      <div className={classes.Likes}>
        <button
          type="button"
          className={classes.Like}
          onClick={
            like
              ? () => {
                  addLike(!like);
                  likeDislikePost(data.slug, logInData.token, "DELETE");
                  changeLikeCount(likeCount - 1);
                }
              : () => {
                  addLike(!like);
                  likeDislikePost(data.slug, logInData.token, "POST");
                  changeLikeCount(likeCount + 1);
                }
          }
        >
          {like ? "\u2764\uFE0F" : "\u2661"}
        </button>
        {likeCount}
      </div>
      <div className={classes.User}>{data.author.username}</div>
      <div className={classes.Tags}>
        {data.tagList ? <Tag tagList={data.tagList} /> : <span>`&quot;`</span>}
      </div>
      <div className={classes.Date}>
        {format(new Date(data.createdAt), "MMMM dd, yyyy")}
      </div>
      <div className={classes.Description}>{data.description}</div>
      <div className={classes.Photo}>
        <img
          className={classes.Image}
          src={data.author.image}
          alt={data.author.username}
        />
      </div>
      {isFullPost &&
      logInData.token &&
      logInData.username === data.author.username ? (
        <div className={classes.Buttons}>
          <button
            type="button"
            onClick={() => confirmToPostDelete(true)}
            className={classes.Delete}
          >
            Delete
          </button>
          {isPostDelete ? (
            <Popconfirm
              open
              placement="rightTop"
              title="Are yuo really sure to delete this article?"
              onCancel={() => confirmToPostDelete(false)}
              onConfirm={() => {
                deleteAnArticle(data.slug, logInData.token);
                redirect("/");
              }}
              cancelText="No"
              okText="Yes"
            />
          ) : null}
          <button className={classes.Edit} type="button">
            <Link to={`/articles/${data.slug}/edit`}>Edit</Link>
          </button>
        </div>
      ) : null}

      {isFullPost ? (
        <div className={classes.Body}>
          <Markdown>{data.body}</Markdown>
        </div>
      ) : null}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    tagList: PropTypes.arrayOf(PropTypes.string.isRequired),
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  isFullPost: PropTypes.bool.isRequired,
  logInData: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  deleteAnArticle: PropTypes.func.isRequired,
  likeDislikePost: PropTypes.func.isRequired,
};

export default Post;
