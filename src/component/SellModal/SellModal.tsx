import React, { useEffect, useState } from "react";
import { fromWei } from "web3x-es/utils";
import { NFT } from "../../modules/nft/types";
import dateFnsFormat from "date-fns/format";
import { WalletState } from "../../modules/reducers/xinfinWallet";
import {
  fromMANA,
  getDefaultExpirationDate,
  getNFTName,
  INPUT_FORMAT,
  isOwnedBy,
  toMANA,
} from "../../modules/utilis";
import { NFTAction } from "../NFTAction";
import { Button, Field, Form, Header, Mana, Modal } from "decentraland-ui";
import { useHistory } from "react-router-dom";

type Props = {
  nft: NFT;
  wallet: WalletState;
};

const SellModal: React.FC<Props> = (props: Props) => {
  const { nft, wallet } = props;
  const order = nft.activeOrder;
  const history = useHistory<History>();
  const isLoading = !nft;
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const isUpdate = order !== null;
  const [price, setPrice] = useState(
    isUpdate ? toMANA(+fromWei(order!.price.toString(), "ether")) : ""
  );
  const [expiresAt, setExpiresAt] = useState(
    isUpdate && order!.expiresAt
      ? dateFnsFormat(+order!.expiresAt, INPUT_FORMAT)
      : getDefaultExpirationDate()
  );
  const [confirmPrice, setConfirmPrice] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);

  // Clear confirm price when closing the confirm modal
  useEffect(() => {
    if (!showConfirm) {
      setConfirmPrice("");
    }
  }, [nft, showConfirm, setConfirmPrice]);

  if (!wallet) {
    return null;
  }

  const handleCreateOrder = () => {
    // onCreateOrder(nft, fromMANA(price), new Date(expiresAt).getTime());
  };

  const handleSubmit = () => {
    // hasAuthorization(authorizations, authorization) to check auth
    if (false) {
      handleCreateOrder();
    } else {
      setShowAuthorizationModal(true);
      setShowConfirm(false);
    }
  };

  const handleClose = () => setShowAuthorizationModal(false);

  const orderService = true;

  const isInvalidDate = new Date(expiresAt).getTime() < Date.now();
  const isDisabled =
    !orderService ||
    !isOwnedBy(nft, wallet) ||
    fromMANA(price) <= 0 ||
    isInvalidDate;

  return (
    <NFTAction nft={nft}>
      <Header size="large">
        {isUpdate ? "Update your listing" : "List for sale"}
      </Header>
      <p className="subtitle">
        {isUpdate
          ? "Set a new price and expiration date for"
          : "Set a price and expiration date for"}{" "}
        <b className="primary-text">
          {getNFTName(nft)} {" ."}
        </b>
      </p>

      <Form onSubmit={() => setShowConfirm(true)}>
        <div className="form-fields">
          <Field
            label={"Price"}
            className={"ManaField ETHEREUM"}
            type="text"
            icon={<Mana />}
            placeholder={toMANA(1000)}
            network={"XDC"}
            value={price}
            focus={true}
            onChange={(_event, props) => {
              const newPrice = fromMANA(props.value);
              setPrice(toMANA(newPrice));
            }}
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
            disabled={isDisabled || isLoading}
            loading={isLoading}
          >
            {isUpdate ? "Update" : "List for sale"}
          </Button>
        </div>
      </Form>

      <Modal size="small" open={showConfirm} className="ConfirmPriceModal">
        <Modal.Header>{"Please confirm"}</Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Content>
            {"You are about to list"}
            <b>{getNFTName(nft)}</b>
            <Mana inline>{fromMANA(price).toLocaleString()}</Mana>
            <br />
            {"Please re-enter the price to confirm:"}
            <Field
              className="ManaField ETHEREUM mana-input"
              label={"Price"}
              network={"XDC"}
              placeholder={price}
              value={confirmPrice}
              onChange={(_event, props) => {
                const newPrice = fromMANA(props.value);
                setConfirmPrice(toMANA(newPrice));
              }}
            />
          </Modal.Content>
          <Modal.Actions>
            <div
              className="ui button"
              onClick={() => {
                setConfirmPrice("");
                setShowConfirm(false);
              }}
            >
              {"cancel"}
            </div>
            <Button
              type="submit"
              primary
              disabled={
                isCreatingOrder || fromMANA(price) !== fromMANA(confirmPrice)
              }
              loading={isCreatingOrder}
            >
              {"Proceed"}
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
    </NFTAction>
  );
};

export default SellModal;
