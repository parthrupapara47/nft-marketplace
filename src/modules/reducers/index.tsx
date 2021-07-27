import { combineReducers, compose } from "redux";
import { walletReducer as wallet } from "decentraland-dapps/dist/modules/wallet/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import collectionReducer from "./collection";
import decentralandReducer from "./decentraland";
import xinfinWallet from "./xinfinWallet";

const enhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  wallet,
  collectionReducer,
  decentralandReducer,
  xinfinWallet,
});

const configureStore = () => {
  return createStore(rootReducer, enhancer(applyMiddleware(thunk)));
};

export const store = configureStore();
