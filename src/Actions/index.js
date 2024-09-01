/* eslint-disable no-unused-vars */
import { saveToLocalStorage } from "../LocalStorage/localStorage";
import BlogService from "../Services/BlogService";

const BlogServiceDB = new BlogService();

const postLoaded = (posts, articlesCount) => ({
  type: "POSTS_LOADED",
  payload: posts,
  articlesCount,
});

const errorHappened = () => ({ type: "ERROR_HAPPENED" });

const Fetching = payload => ({ type: "FETCHING", payload });

const ChangePage = payload => ({ type: "CHANGE_PAGE", payload });

const setFullPost = payload => ({ type: "SET_FULL_POST", payload });

const setSignUpError = payload => ({ type: "SET_SIGN_UP_ERROR", payload });

const forceUpdateLogInData = payload => ({
  type: "FORCE_UPDATE_LOG_IN_DATA",
  payload,
});

const getPostsThinkCreator = (numberPage, token) => dispatch => {
  dispatch(Fetching(true));
  BlogServiceDB.getPost(numberPage, token).then(res => {
    const { articles, articlesCount } = res;
    dispatch(postLoaded(articles, articlesCount));
  });
};

const setFullPostThunkCreator = slug => dispatch => {
  dispatch(Fetching(true));
  BlogServiceDB.getPostWithSlug(slug).then(res => {
    const { article } = res;
    dispatch(setFullPost(article));
  });
};

const postAuthData = (data, url) => dispatch => {
  BlogServiceDB.signUpPostRequest(data, url).then(res => {
    const { user, errors } = res;
    if (user) {
      saveToLocalStorage(user);
      dispatch(forceUpdateLogInData(user));
      dispatch(setSignUpError({}));
    } else dispatch(setSignUpError(errors));
  });
};

const putEditProfile = (data, token) => dispatch => {
  BlogServiceDB.updateCurrentUser(data, token).then(res => {
    const { user, errors } = res;
    if (user) {
      saveToLocalStorage(user);
      dispatch(forceUpdateLogInData(user));
      dispatch(setSignUpError({}));
    } else dispatch(setSignUpError(errors));
  });
};

const createNewArticle = (data, token) => dispatch => {
  BlogServiceDB.postNewArticle(data, token).then(res => {
    const { article, errors } = res;
    if (article) {
      dispatch(setSignUpError({}));
    } else dispatch(setSignUpError(errors));
  });
};

const updateAnArticle = (data, token, slug) => dispatch => {
  BlogServiceDB.updateArticle(data, token, slug).then(res => {
    const { article, errors } = res;
    if (article) {
      dispatch(setSignUpError({}));
    } else dispatch(setSignUpError(errors));
  });
};

const deleteAnArticle = (slug, token) => dispatch => {
  BlogServiceDB.deleteArticle(slug, token);
  getPostsThinkCreator(1);
};

const likeDislikePost = (slug, token, method) => dispatch => {
  BlogServiceDB.estimationPost(slug, token, method);
  getPostsThinkCreator(1);
};

export {
  ChangePage,
  createNewArticle,
  deleteAnArticle,
  Fetching,
  forceUpdateLogInData,
  getPostsThinkCreator,
  likeDislikePost,
  postAuthData,
  postLoaded,
  putEditProfile,
  setFullPost,
  setFullPostThunkCreator,
  updateAnArticle,
};
