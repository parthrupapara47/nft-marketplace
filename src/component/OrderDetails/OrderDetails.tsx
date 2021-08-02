import { formatDistance } from "date-fns";
import { Header, Button, Stats, Modal, Mana } from "decentraland-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NFT } from "../../modules/nft/types";

type Props = { nft: NFT };

const OrderDetails: React.FC<Props> = (props: Props) => {
  const { nft } = props;
  const [showLeavingSiteModal, setShowLeavingSiteModal] =
    useState<boolean>(false);
  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });
  const order = nft.orders.length;
  const isOwner = wallet.accounts === nft.owner.address;
  const canSell = true;
  const isBiddable = true;
  const canBid =
    !isOwner &&
    isBiddable &&
    nft.category !== "wearable" &&
    (!wallet || !nft.bids.some((bid) => bid.bidder === wallet.accounts));
  const isForSell = nft?.activeOrder !== null ? true : false;

  return (
    <>
      <div className="Row Title">
        <div className="Column left grow">
          <Stats title="Network">
            <Header>Xinfin</Header>
          </Stats>
          {isForSell ? (
            <>
              <Stats title="price">
                <Mana>{Math.floor(nft.activeOrder?.price / 10 ** 18)}</Mana>
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
            </>
          ) : null}
        </div>
        <div className="Column right">
          {order ? (
            isOwner && canSell ? (
              <>
                <Button as={Link} to={`/contracts/${nft.id}/update`} primary>
                  {"Update price"}
                </Button>
                <Button as={Link} to={`/contracts/${nft.id}/cancel`}>
                  {"Remove listing"}
                </Button>
              </>
            ) : !isOwner ? (
              <>
                <Button as={Link} to={`/contracts/${nft.id}/buy`} primary>
                  {"BUY"}
                </Button>
                {canBid ? (
                  <Button as={Link} to={`/contracts/${nft.id}/bid`}>
                    {"BID"}
                  </Button>
                ) : null}
              </>
            ) : (
              <Button onClick={() => setShowLeavingSiteModal(true)} primary>
                {"See listing"}
              </Button>
            )
          ) : isOwner && canSell ? (
            <Button as={Link} to={`/contracts/${nft.id}/sell`} primary>
              {"SELL"}
            </Button>
          ) : isOwner && !canSell ? (
            <Button onClick={() => setShowLeavingSiteModal(true)} primary>
              {"SELL"}
            </Button>
          ) : canBid ? (
            <Button as={Link} to={`/contracts/${nft.id}/bid`} primary>
              {"BID"}
            </Button>
          ) : null}
          {isOwner && !order ? (
            <Button as={Link} to={`/contracts/${nft.id}/transfer`}>
              {"Transfer"}
            </Button>
          ) : null}
          <Modal
            className="LeavingSiteModal"
            size="small"
            open={showLeavingSiteModal}
            onClose={() => setShowLeavingSiteModal(false)}
          >
            <Modal.Header>{"Leaving Decentraland"}</Modal.Header>
            <Modal.Content>
              <p>
                {`/contracts/${nft.id}`}
                <br />
                <br />
                <small>
                  <i>
                    {
                      "Your NFTs will still be listed in the Decentraland Marketplace"
                    }
                  </i>
                </small>
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setShowLeavingSiteModal(false)}>
                {"CANCEL"}
              </Button>
              <Button
                primary
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowLeavingSiteModal(false)}
              >
                {"PROCEED"}
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderDetails);
