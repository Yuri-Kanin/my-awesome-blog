import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Articles,
  EditArticle,
  HomePage,
  NewArticle,
  Profile,
  SignIn,
  SignUp,
} from "../Pages";
import classes from "./App.module.scss";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/articles", element: <HomePage /> },
    {
      path: "articles/:articlesSlug",
      element: <Articles />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/new-article",
      element: <NewArticle />,
    },
    {
      path: "articles/:articlesSlug/edit",
      element: <EditArticle />,
    },
  ]);

  return (
    <div className={classes.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
