import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
// import { Navbar as BaseNavbar } from "decentraland-dapps/dist/containers";
import { Link } from "react-router-dom";
import "./Navbar.css";

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

  useEffect(() => {
    let path = {
      market: "item",
      collection: "item",
      signin: "item",
    };
    switch (pathname) {
      case "/":
        path.market = "active item";
        break;
      case "/collection":
        path.collection = "active item";
        break;
      case "/signin":
        path.signin = "active item";
        break;
      default:
        break;
    }
    setClassname(path);
  }, [pathname]);

  return (
    <div className="dcl navbar fullscreen" role="navigation">
      <div className="ui container">
        <div className="dcl navbar-menu">
          <div className="ui secondary stackable menu">
            <Link className={classname.market} to="/">
              XinFin Marketplace
            </Link>
            <Link className={classname.collection} to="/collection">
              My Collections
            </Link>
          </div>
        </div>
        <div className="dcl navbar-account">
          <div className="ui secondary menu">
            <Link className={`${classname.signin} sign-in-button`} to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
