import React from "react";
import { Navbar } from "../Navbar";
import { ReactComponent as Wallet } from "../../style/images/wallet.svg";
import { Header } from "decentraland-ui";
import { Footer } from "../Footer";
const SignInPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="dcl page fullscreen SignInPage">
        <div className="SignIn center">
          <Header>Get Started</Header>
          <div className="StarWalletIcon">
            <Wallet />
          </div>
          <p className="message">
            You can use the
            <a
              // href="https://xinfin.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" XinFin "}
            </a>
            extension
          </p>
          <button className="ui primary button">Connect</button>
          <p className="error">Could not connect to wallet.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignInPage;
