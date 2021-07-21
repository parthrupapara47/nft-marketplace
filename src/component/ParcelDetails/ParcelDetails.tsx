import React from "react";
import { Container, Header, Loader, Profile } from "decentraland-ui";
import { NFT } from "../../modules/nft/types";
import { NftImage } from "../NftImage";
import { TransactionHistory } from "../TransactionHistory";
import { Bid } from "../Bid";
import { OrderDetails } from "../OrderDetails";
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
                    {nft.name}
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
                  <a>
                    <label>Owner</label>
                    <div className="blockie-wrapper">
                      <Profile
                        size="large"
                        address={nft.owner.address}
                        imageOnly
                      />
                    </div>
                  </a>
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
            <OrderDetails nft={nft} bid buy />
            <Bid nft={nft} />
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
