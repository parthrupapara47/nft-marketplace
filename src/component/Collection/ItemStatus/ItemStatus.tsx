import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Back } from "decentraland-ui";
import { Navbar } from "../../Navbar";
import "./ItemStatus.css";
import { headerImage, statusData } from "./ItemStatus.data";
import { Footer } from "../../Footer";
import { WalletProvider } from "../../WalletProvider";

const ItemStatus: React.FC = () => {
  const histrory = useHistory();
  const { itemId } = useParams<{ itemId: string }>();
  return (
    <div className="itemstatus">
      <Navbar />
      <WalletProvider>
        <div className="item_header">
          <div>
            <Back onClick={() => histrory.push(`/collection/${itemId}`)} />
          </div>
          <div className="itemdetails">
            <img alt="" src={headerImage} />
            <div className="titles">
              <h2>TEST - 1</h2>
            </div>
            <div className="item_owner_payout">
              <span>ITEM - 1</span>
              <span>Owner - 1</span>
              <span>Payout - $$</span>
            </div>
          </div>
        </div>
        <div className="details_cointener">
          {statusData.map((each, index) => (
            <div className={each.name} key={index}>
              <div className="titles">
                <span>
                  <i className={each.logo} aria-hidden="true"></i>
                </span>
                <span>
                  <label>{each.title}</label>
                </span>
              </div>
              <div className="details_box">
                <div className="item_img">
                  <i className="fa fa-picture-o fa-4" aria-hidden="true"></i>
                </div>
                <div className="item_name">
                  <div>{each.firstValue}</div>
                  <div>{each.secondValue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </WalletProvider>
      <Footer />
    </div>
  );
};

export default ItemStatus;
