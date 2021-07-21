import { formatDistanceToNow } from "date-fns";
import { Header, Mana, Profile, Stats } from "decentraland-ui";
import React from "react";
import { NFT } from "../../modules/nft/types";

type Props = { nft: NFT };

const Bid: React.FC<Props> = (props: Props) => {
  const { nft } = props;
  return (
    <>
      {nft.bids.length > 0 ? (
        <div className="Bids">
          <Header sub>Bids</Header>
          <div className="list">
            {nft.bids.map((bid, index) => (
              <div className="Bid" key={index}>
                <div className="bid-row">
                  <div className="wrapper">
                    <div className="info">
                      <Stats className="from" title="FROM">
                        <Profile address={bid.bidder} />
                      </Stats>
                      <Stats title="PRICE">
                        <Mana>{Math.floor(+bid.price / 10 ** 18)}</Mana>
                      </Stats>
                      <Stats title="EXPIRES IN">
                        {formatDistanceToNow(+bid.expiresAt)}
                      </Stats>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Bid);
