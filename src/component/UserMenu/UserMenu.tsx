import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { _walletLogOut } from "../../modules/action/xinfinWallet";
import { WalletState } from "../../modules/reducers/xinfinWallet";

interface Props {
  wallet: WalletState;
}

const UserMenu: React.FC<Props> = (props: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const openAvtar = () => {
    setOpenMenu(!openMenu);
  };
  const closeAvtar = () => {
    setOpenMenu(false);
  };
  const logOut = () => {
    dispatch(_walletLogOut());
  };
  return (
    <div className="dcl row left dcl user-menu-wrapper grow shrink">
      <div className="dcl user-menu" onBlur={() => closeAvtar()} tabIndex={0}>
        <span className="dcl account-wrapper">
          <a
            title={`${props.wallet.balance} MANA`}
            className="ui small header dcl mana"
          >
            <i className="symbol">⏣</i>
            {props.wallet.balance}
          </a>
        </span>
        <div className="toggle" onClick={() => openAvtar()}>
          <div className="dcl avatar-face medium">
            <div className="guest-face"></div>
          </div>
        </div>
        <div className={`menu  ${openMenu ? "open clickable" : ""}`}>
          <div className="info ">
            <div className="image">
              <div className="dcl avatar-face small">
                <div className="guest-face"></div>
              </div>
            </div>
            <div>
              <div className="name">Guest</div>
            </div>
          </div>
          <ul className="actions">
            <li onClick={() => logOut()}>
              <i className="sign-out-icon"></i>Sign Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
