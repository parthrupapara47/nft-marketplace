import React from "react";
import { Popup, Profile } from "decentraland-ui";
import { Container, Header, Loader } from "decentraland-ui";
import { NFT, RARITY_COLOR } from "../../modules/nft/types";
import { NftImage } from "../NftImage";
import { isUnisex } from "../../modules/Wearable/utils";
import { Bid } from "../Bid";
import { TransactionHistory } from "../TransactionHistory";
import { OrderDetails } from "../OrderDetails";

type Props = {
  nft: NFT;
};

const WearableDetails: React.FC<Props> = (props: Props) => {
  const { nft } = props;
  return (
    <>
      {nft !== undefined ? (
        <>
          <div className="WearableDetail">
            <div className="PageHeader">
              <NftImage nft={nft} isDraggable={true} />
            </div>
            <Container className="ENSDetail">
              <div className="Row Title">
                <div className="Column left grow">
                  <Header size="large">
                    <div className="text">
                      {nft.name}
                      <Popup
                        position="top center"
                        content={nft.wearable.rarity}
                        trigger={
                          <div
                            className="rarity"
                            style={{
                              backgroundColor:
                                RARITY_COLOR[nft.searchWearableRarity],
                            }}
                          >
                            {nft.wearable.rarity}
                          </div>
                        }
                      />
                    </div>
                  </Header>
                </div>
                <div className="Column right">
                  <div className="Owner">
                    <a>
                      <label>Owner</label>
                      <div className="blockie-wrapper">
                        <Profile
                          address={nft.owner.address}
                          size="large"
                          imageOnly
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {nft.wearable.description !== "" ? (
                <div className="Description">
                  <Header sub>Description</Header>
                  <div className="description-text">
                    {nft.wearable.description}
                  </div>
                </div>
              ) : null}
              <OrderDetails nft={nft} bid buy />
              <div className="Highlights">
                <Header sub>Highlights</Header>
                <div className="Row ">
                  <div className="Column left Highlight clickable">
                    <div className="Row ">
                      <div className="Column left">
                        <div className={nft.searchWearableCategory}></div>
                      </div>
                      <div className="Column right">
                        <div className="name">{nft.searchWearableCategory}</div>
                      </div>
                    </div>
                  </div>
                  {isUnisex(nft.searchWearableBodyShapes) ? (
                    <div className="Column left Highlight clickable">
                      <div className="Row ">
                        <div className="Column left">
                          <div className="Unisex" />
                        </div>
                        <div className="Column right">
                          <div className="name">Unisex</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="Column left Highlight clickable">
                      <div className="Row ">
                        <div className="Column left">
                          <div
                            className={nft.searchWearableBodyShapes[0]}
                          ></div>
                        </div>
                        <div className="Column right">
                          <div className="name">
                            {nft.searchWearableBodyShapes[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Bid nft={nft} />
              <TransactionHistory nft={nft} />
            </Container>
          </div>
        </>
      ) : (
        <Loader active size="huge" />
      )}
    </>
  );
};

export default React.memo(WearableDetails);
