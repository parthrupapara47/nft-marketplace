import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { ReactComponent as WalletSvg } from "../../style/images/wallet.svg";
import { Button, Header, Page } from "decentraland-ui";
import { Footer } from "../Footer";
import { xinfinWallet, _xinfinWallet } from "../../modules/action/xinfinWallet";
import { useDispatch, useSelector } from "react-redux";
import WalletModel from "./WalletModel";

const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });
  const { isConnected, eth, isConnecting } = wallet;

  const connectWallet = () => {
    dispatch(
      _xinfinWallet({
        isConnecting: true,
        chainId: null,
      })
    );
    dispatch(xinfinWallet());

    setTimeout(() => {
      if (!isConnected && !isConnecting) {
        setModelOpen(true);
      } else {
        setModelOpen(false);
      }
    }, 1000);
  };

  const closeModel = useCallback(() => {
    setModelOpen(false);
  }, [modelOpen]);

  return (
    <>
      <Navbar />
      <Page isFullscreen className="SignInPage">
        <div className="SignIn center">
          <Header>Get Started</Header>
          <div className="StarWalletIcon">
            <WalletSvg />
          </div>
          <p className="message">
            You can use the
            <a
              href="https://chrome.google.com/webstore/detail/xinpay/bocpokimicclpaiekenaeelehdjllofo"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" XinFin "}
            </a>
            extension
          </p>
          <Button
            primary
            disabled={isConnected || isConnecting ? true : false}
            onClick={(e) => connectWallet()}
          >
            {isConnected
              ? "Connected"
              : isConnecting
              ? "Connecting"
              : "Connect"}
          </Button>
        </div>
      </Page>
      <Footer />
      <WalletModel open={modelOpen} closeModel={closeModel} wallet={wallet} />
    </>
  );
};

export default SignInPage;
