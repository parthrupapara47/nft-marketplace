import React from "react";
import { Container, Header, Loader, Profile } from "decentraland-ui";
import { NFT } from "../../modules/nft/types";
import { NftImage } from "../NftImage";
import { TransactionHistory } from "../TransactionHistory";
import { Bids } from "../Bids";
import { OrderDetails } from "../OrderDetails";
import { getNFTName } from "../../modules/utilis";
import { Link } from "react-router-dom";
type Props = {
  nft: NFT;
};
const ParcelDetails: React.FC<Props> = (props: Props) => {
  const { nft } = props;

  return (
    <>
      {nft !== undefined ? (
        <>
          <div className="PageHeader">
            <NftImage nft={nft} isDraggable={true} />
          </div>
          <Container className="ParcelDetail">
            <div className="Row Title">
              <div className="Column left grow">
                <Header size="large">
                  <div className="text">
                    {getNFTName(nft)}
                    <div
                      className="Badge "
                      style={{ backgroundColor: "rgb(55, 51, 61)" }}
                    >
                      <i className="pin"></i>
                      {nft.searchParcelX},{nft.searchParcelY}
                    </div>
                  </div>
                </Header>
              </div>
              <div className="Column right">
                <div className="Owner">
                  <Link to={`/accounts/${nft.owner.address}`}>
                    <label>Owner</label>
                    <div className="blockie-wrapper">
                      <Profile
                        size="large"
                        address={nft.owner.address}
                        imageOnly
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {nft.parcel.data !== null && nft.parcel.data.description !== "" ? (
              <div className="Description">
                <Header sub>Description</Header>
                <div className="description-text">
                  {nft.parcel.data.description}
                </div>
              </div>
            ) : null}
            <OrderDetails nft={nft} />
            <Bids nft={nft} />
            <TransactionHistory nft={nft} />
          </Container>
        </>
      ) : (
        <Loader active size="huge" />
      )}
    </>
  );
};

export default React.memo(ParcelDetails);
