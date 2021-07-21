import { combineReducers } from "redux";
import { walletReducer as wallet } from "decentraland-dapps/dist/modules/wallet/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import collectionReducer from "./collection";
import decentralandReducer from "./decentraland";

const enhancer = applyMiddleware(thunk);
const rootReducer = combineReducers({
  wallet,
  enhancer,
  collectionReducer,
  decentralandReducer,
  // your other reducers
});

const configureStore = () => {
  return createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export const store = configureStore();
