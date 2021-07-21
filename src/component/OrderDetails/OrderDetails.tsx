import { formatDistance } from "date-fns";
import { Header, Button, Stats } from "decentraland-ui";
import React from "react";
import { NFT } from "../../modules/nft/types";

type Props = { nft: NFT; bid?: boolean; buy?: boolean };

const OrderDetails: React.FC<Props> = (props: Props) => {
  const { nft, bid, buy } = props;
  return (
    <>
      <div className="Row Title">
        <div className="Column left grow">
          <Stats title="Network">
            <Header>Xinfin</Header>
          </Stats>
          <Stats title="price">
            <div className="ui header dcl mana">
              <i className="symbol">⏣</i>
              {Math.floor(nft.activeOrder?.price / 10 ** 18)}
            </div>
          </Stats>
          <Stats title="Expires in">
            <Header>
              {nft.activeOrder?.expiresAt !== undefined
                ? formatDistance(
                    parseInt(nft.activeOrder?.expiresAt),
                    new Date()
                  )
                : "NAN"}
            </Header>
          </Stats>
        </div>
        <div className="Column right">
          {buy ? <Button primary>Buy</Button> : null}
          {bid ? <Button>Bid</Button> : null}
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderDetails);
