import { Back } from "decentraland-ui";
import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { headerImage, tabelHeader, tableBody } from "./PayoutDetails.data";
import { Table } from "../../Table";
import "./PayoutDetails.css";
import { Footer } from "../../Footer";
import { WalletProvider } from "../../WalletProvider";

const PayoutDetails: React.FC = () => {
  const histrory = useHistory();

  return (
    <div className="payout_details">
      <Navbar />
      <WalletProvider>
        <div className="payout_header">
          <div>
            <Back onClick={() => histrory.push(`/payout`)} />
          </div>
          <div className="itemdetails">
            <img alt="" src={headerImage} />
            <div className="title">
              <h2>TEST - 1</h2>
            </div>
          </div>
        </div>
        <div className="total">
          <h4>Payout - $ 00.00</h4>
        </div>
        <div className="payout_details">
          <Table header={tabelHeader} body={tableBody} />
        </div>
      </WalletProvider>
      <Footer />
    </div>
  );
};

export default PayoutDetails;
