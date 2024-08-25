import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./reducers/cartReducer";
import settingReducer from "./reducers/settingReducer";

const rootReducer = combineReducers({
  cartReducer,
  settingReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
