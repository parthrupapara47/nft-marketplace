import React, { useState } from "react";
import { fromWei } from "web3x-es/utils";
import { Button, Header, Mana } from "decentraland-ui";
import { NFT } from "../../modules/nft/types";
import { NFTAction } from "../NFTAction";
import { WalletState } from "../../modules/reducers/xinfinWallet";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { getNFTName, isOwnedBy } from "../../modules/utilis";

type Props = {
  nft: NFT;
  wallet: WalletState;
};

const BuyModal: React.FC<Props> = (props: Props) => {
  const { nft, wallet } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory<History>();
  const order = nft.activeOrder;
  const isOwner = isOwnedBy(nft, wallet);
  const isInsufficientMANA =
    !!order &&
    parseInt(wallet.balance) < +fromWei(order.price.toString(), "ether");
  const isDisabled =
    !order || isOwner || isInsufficientMANA || nft.category === "estate";

  const priceInEth = +fromWei(order.price.toString(), "ether");

  let subtitle = null;
  if (!order) {
    subtitle = `${getNFTName(nft)} is not for sale.`;
  } else if (isOwner) {
    subtitle = `You are the owner of ${getNFTName(nft)}.`;
  } else if (isInsufficientMANA) {
    subtitle = (
      <>
        {`You don't have enough MANA to buy ${getNFTName(nft)} for`}
        <Price price={priceInEth} />.
      </>
    );
  } else {
    subtitle = (
      <>
        {`You are about to buy ${getNFTName(nft)} for`}
        <Price price={priceInEth} />.
      </>
    );
  }

  return (
    <NFTAction nft={nft}>
      <Header size="large">{`Buy ${nft.category}`}</Header>
      <div className={isDisabled ? "error" : ""}>{subtitle}</div>
      <div className="buttons">
        <Button
          onClick={() => {
            history.push(`/contracts/${nft.id}`);
          }}
        >
          {"CANCEL"}
        </Button>

        {isDisabled || true ? (
          <Button
            primary
            disabled={isDisabled || isLoading}
            onClick={() => {}}
            loading={isLoading}
          >
            {"Buy"}
          </Button>
        ) : (
          <Button primary onClick={() => {}} loading={isLoading}>
            {"Proceed anyways"}
          </Button>
        )}
      </div>
    </NFTAction>
  );
};

const Price = (props: { price: number }) => <Mana inline>{props.price}</Mana>;

export default React.memo(BuyModal);
