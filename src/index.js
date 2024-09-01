import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./Components/App";
import ErrorBoundary from "./Components/ErrorBoundary";
import store from "./Store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
