import React from "react";
import { Container, Header, Loader, Profile } from "decentraland-ui";
import { NFT } from "../../modules/nft/types";
import { Bids } from "../Bids";
import { NftImage } from "../NftImage";
import { TransactionHistory } from "../TransactionHistory";
import { OrderDetails } from "../OrderDetails";
import { getNFTName } from "../../modules/utilis";
import { Link } from "react-router-dom";

type Props = {
  nft: NFT;
};

const EstateDetails: React.FC<Props> = (props: Props) => {
  const { nft } = props;
  return (
    <>
      {nft !== undefined ? (
        <>
          <div className="PageHeader">
            <NftImage nft={nft} isDraggable={true} />
          </div>
          <Container className="EstateDetail">
            <div className="Row Title">
              <div className="Column left grow">
                <Header size="large">
                  <div className="text">
                    {getNFTName(nft)}
                    <div
                      className="Badge "
                      style={{ backgroundColor: "rgb(55, 51, 61)" }}
                    >
                      {nft.estate?.parcels?.length} {"LAND"}
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
            {nft.estate.data !== null ? (
              nft.estate.data.description !== "" ? (
                <div className="Description">
                  <Header sub>Description</Header>
                  <div className="description-text">
                    {nft.estate.data.description}
                  </div>
                </div>
              ) : null
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

export default React.memo(EstateDetails);
