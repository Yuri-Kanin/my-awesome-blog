import { loadFromLocalStorage } from "../LocalStorage/localStorage";

const persistedState = loadFromLocalStorage();

const initialState = {
  articlesCount: 1,
  currentPage: 1,
  isFetching: true,
  isError: false,
  posts: [],
  fullPost: [],
  logInData: persistedState || {},
  logInError: {},
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "POSTS_LOADED":
      return {
        ...state,
        posts: action.payload,
        articlesCount: action.articlesCount,
        isFetching: false,
      };

    case "ERROR_HAPPENED":
      return { ...state, isError: true, isFetching: false };

    case "FETCHING":
      return { ...state, isFetching: true };

    case "CHANGE_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_FULL_POST":
      return { ...state, fullPost: [action.payload], isFetching: false };

    case "SET_SIGN_UP_ERROR":
      return { ...state, logInError: action.payload };

    case "FORCE_UPDATE_LOG_IN_DATA":
      return { ...state, logInData: action.payload };

    default:
      return state;
  }
};

export default reducer;
