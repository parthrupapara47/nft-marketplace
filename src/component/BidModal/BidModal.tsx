import { Button, Field, Form, Header, Mana } from "decentraland-ui";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { NFT } from "../../modules/nft/types";
import { WalletState } from "../../modules/reducers/xinfinWallet";
import {
  fromMANA,
  getDefaultExpirationDate,
  getNFTName,
  isOwnedBy,
  toMANA,
} from "../../modules/utilis";
import { NFTAction } from "../NFTAction";

type Props = {
  nft: NFT;
  wallet: WalletState;
};

const BidModal: React.FC<Props> = (props: Props) => {
  const { nft, wallet } = props;

  const history = useHistory<History>();
  const [price, setPrice] = useState("");
  const [expiresAt, setExpiresAt] = useState(getDefaultExpirationDate());
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);

  const handlePlaceBid = useCallback(() => {}, [nft, price, expiresAt]);

  const isPlacingBid = false;

  const handleSubmit = () => {
    if (true) {
      handlePlaceBid();
    } else {
      setShowAuthorizationModal(true);
    }
  };

  const handleClose = () => setShowAuthorizationModal(false);

  const isInvalidDate = +new Date(expiresAt) < Date.now();

  const hasInsufficientMANA =
    !!price && !!wallet && fromMANA(price) > parseInt(wallet.balance);

  return (
    <NFTAction nft={nft}>
      <Header size="large">{"Place a bid"}</Header>
      <p className="subtitle">
        {`Set a price and expiration date for your bid on ${getNFTName(nft)}.`}
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <Field
            network={"XDC"}
            label={"Price"}
            className={"ManaField ETHEREUM"}
            icon={<Mana />}
            iconPosition="left"
            placeholder={toMANA(1000)}
            value={price}
            onChange={(_event, props) => {
              const newPrice = fromMANA(props.value);
              setPrice(toMANA(newPrice));
            }}
            error={hasInsufficientMANA}
            message={
              hasInsufficientMANA ? "You don't have enough MANA" : undefined
            }
          />
          <Field
            label={"Expiration date"}
            type="date"
            value={expiresAt}
            onChange={(_event, props) =>
              setExpiresAt(props.value || getDefaultExpirationDate())
            }
            error={isInvalidDate}
            message={isInvalidDate ? "This date has already passed" : undefined}
          />
        </div>
        <div className="buttons">
          <Button as="div" onClick={() => history.push(`/contracts/${nft.id}`)}>
            {"cancel"}
          </Button>
          <Button
            type="submit"
            primary
            disabled={
              isOwnedBy(nft, wallet) ||
              fromMANA(price) <= 0 ||
              isInvalidDate ||
              hasInsufficientMANA ||
              isPlacingBid
            }
          >
            {"Bid"}
          </Button>
        </div>
      </Form>
      {/* <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        isLoading={isPlacingBid}
        onProceed={handlePlaceBid}
        onCancel={handleClose}
      /> */}
    </NFTAction>
  );
};

export default React.memo(BidModal);
