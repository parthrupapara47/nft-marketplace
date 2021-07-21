import React from "react";
import { Container, Header, Loader, Profile } from "decentraland-ui";
import "./NameDetails.css";
import { NftImage } from "../NftImage";
import { NFT } from "../../modules/nft/types";
import { OrderDetails } from "../OrderDetails";

type Props = {
  nft: NFT;
};

const NameDetails: React.FC<Props> = (props: Props) => {
  const { nft } = props;
  return (
    <>
      {nft !== undefined ? (
        <>
          <div className="">
            <div className="PageHeader">
              <NftImage nft={nft} isDraggable={true} />
            </div>
            <Container className="ENSDetail">
              <div className="Row Title">
                <div className="Column left grow">
                  <Header size="large">
                    <div className="text">
                      {nft.name}
                      {nft.category === "ens" ? (
                        <div
                          className="Badge"
                          style={{ backgroundColor: "rgb(55, 51, 61)" }}
                        >
                          Name
                        </div>
                      ) : null}
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
              <OrderDetails nft={nft} bid buy />
            </Container>
          </div>
        </>
      ) : (
        <Loader active size="huge" />
      )}
    </>
  );
};

export default React.memo(NameDetails);
