import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import { useLocation } from "react-router";
import { Navbar as BaseNavbar } from "decentraland-dapps/dist/containers";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import { UserMenu } from "../UserMenu";
// import { UserMenu } from "decentraland-ui";

type ClassName = {
  market: string;
  collection: string;
  signin: string;
};

const Navbar: React.FC = () => {
  const [classname, setClassname] = useState<ClassName>({
    market: "active item",
    collection: "item",
    signin: "item",
  });
  const { pathname } = useLocation();
  const history = useHistory();
  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });
  let rightMenu;
  const navbarLogo = document.getElementsByClassName("dcl navbar-logo")[0];
  if (navbarLogo !== undefined) {
    navbarLogo.setAttribute("href", "https://xinfin.org/");
    navbarLogo.setAttribute("target", "_blank");
  }

  useEffect(() => {
    let path = {
      market: "item",
      collection: "item",
      signin: "item",
    };

    if (pathname.includes("/collection")) {
      path.collection = "active item";
    } else if (pathname.includes("/signin")) {
      path.signin = "active item";
    } else if (pathname.includes("/payout")) {
      path.collection = "active item";
    } else {
      path.market = "active item";
    }
    setClassname(path);
  }, [pathname]);

  if (wallet.isConnected) {
    rightMenu = { rightMenu: <UserMenu wallet={wallet} /> };
  }

  return (
    <BaseNavbar
      isFullscreen
      isSignIn={
        pathname.includes("/signin") && !wallet.isConnecting ? true : false
      }
      isConnected={wallet.isConnected}
      isConnecting={wallet.isConnecting}
      onSignIn={() => history.push("/signin")}
      address={wallet.accounts}
      mana={wallet.balance}
      {...rightMenu}
      leftMenu={
        <>
          <Link className={classname.market} to="/">
            XinFin Marketplace
          </Link>
          <Link className={classname.collection} to="/collection">
            My Collections
          </Link>
        </>
      }
    />
  );
};

export default Navbar;
