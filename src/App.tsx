import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Payout } from "./component/Payout/PayoutList";
import { ItemDetails } from "./component/Collection/ItemDetails";
import { AddItem } from "./component/Collection/AddItem";
import { ItemStatus } from "./component/Collection/ItemStatus";
import { useLocation } from "react-router-dom";
import { PayoutDetails } from "./component/Payout/PayoutDetails";
import { CollectionList } from "./component/Collection/CollectionList";
import { Home } from "./component/Home";
import { Browse } from "./component/Browse";
import { SignInPage } from "./component/SignIn";
import NftPage from "./component/NftPage/NftPage";
import "./App.css";
import { xinfinWallet, _xinfinWallet } from "./modules/action/xinfinWallet";
import { useDispatch, useSelector } from "react-redux";
import { NFTBuy } from "./component/NFTBuy";
import { WalletState } from "./modules/reducers/xinfinWallet";
import { NFTBid } from "./component/NFTBid";
import { Account } from "./component/Account";
import { SellPage } from "./component/SellPage";

interface LocationState {
  from: {
    pathname: string;
  };
}

const App: React.FC = () => {
  const { pathname } = useLocation<LocationState>();
  document.title = "XinFin-Marketplace";
  const dispatch = useDispatch();
  const wallet: WalletState = useSelector((state: any) => {
    return state.xinfinWallet;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (!wallet.isConnected) {
      dispatch(
        _xinfinWallet({
          isConnecting: true,
          chainId: null,
        })
      );
      dispatch(xinfinWallet());
    }
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/accounts/:address" component={Account} />
        <Route exact path="/browse/:category?" component={Browse} />
        <Route exact path="/contracts/:id" component={NftPage} />
        <Route exact path="/contracts/:id/buy" component={NFTBuy} />
        <Route exact path="/contracts/:id/bid" component={NFTBid} />
        <Route exact path="/contracts/:id/sell" component={SellPage} />
        <Route exact path="/collection" component={CollectionList} />
        <Route exact path="/collection/:itemId" component={ItemDetails} />
        <Route exact path="/collection/:itemId/additem" component={AddItem} />
        <Route
          exact
          path="/collection/:itemId/itemstatus"
          component={ItemStatus}
        />
        <Route exact path="/payout" component={Payout} />
        <Route exact path="/payout/:itemid" component={PayoutDetails} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
