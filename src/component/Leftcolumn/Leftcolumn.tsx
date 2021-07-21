import React from "react";
import { Link } from "react-router-dom";
import "./Leftcolumn.css";

const Leftcolumn: React.FC = () => {
  return (
    <div className="leftcolumn">
      <ul className="">
        <li className="mycollection leftmenu">
          <Link to="/collection">
            <i className="fa fa-files-o"></i>
            <div className="">
              <h4>My Collection</h4>
            </div>
          </Link>
        </li>
        <li className="mypayout leftmenu">
          <Link to="/payout">
            <i className="fa fa-usd" aria-hidden="true"></i>
            <div className="">
              <h4>My Payout</h4>
            </div>
          </Link>
        </li>
        <li className="help leftmenu">
          <Link to="/collection">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            <div className="">
              <h4>Community & Help</h4>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Leftcolumn;
