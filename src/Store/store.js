import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import reducer from "../Reducers";

const store = configureStore(
  {
    reducer,
  },
  applyMiddleware(thunk)
);
// store.subscribe(() => console.log(store.getState()));
export default store;
