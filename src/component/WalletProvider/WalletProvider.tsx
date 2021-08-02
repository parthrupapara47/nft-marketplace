import React from "react";
import { Loader } from "decentraland-ui";
import { Link } from "react-router-dom";
import { WalletState } from "../../modules/reducers/xinfinWallet";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const NotConnected = () => (
  <div className="wallet-center">
    <p className="secondary-text">
      You need to <Link to={"/signin"}>{"Sign in"}</Link> to access this page.
    </p>
  </div>
);

const WalletProvider = (props: Props) => {
  const { children } = props;
  const wallet: WalletState = useSelector((state: any) => {
    return state.xinfinWallet;
  });
  return (
    <>
      {!wallet.isConnected ? <NotConnected /> : null}
      {wallet.isConnected ? children : null}
    </>
  );
};

export default React.memo(WalletProvider);
