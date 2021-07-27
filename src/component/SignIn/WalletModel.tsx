import React, { useEffect, useState } from "react";
import { Close, Modal, ModalNavigation } from "decentraland-ui";
import { WalletState } from "../../modules/reducers/xinfinWallet";

interface Props {
  wallet: WalletState;
  open: boolean;
  closeModel: () => void;
}

const WalletModel: React.FC<Props> = (props: Props) => {
  const { wallet } = props;
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    console.log(wallet);
    if (wallet.eth && wallet.chainId !== 50) {
      setHeader("Wrong Network");
      setMessage(
        "You need to be connected to XinFin MAINNET to use this app, but you are currently connected to Another Network."
      );
    } else if (wallet.eth === false) {
      setHeader("Non-Ethereum browser detected");
      setMessage("Please install XinFin Extensions");
    } else if (wallet.eth && !wallet.isConnected) {
      setHeader("Could not connect to wallet.");
      setMessage("Please try again");
    }
  }, [props]);
  return (
    <>
      {header !== "" ? (
        <Modal
          size="small"
          open={props.open}
          closeIcon={<Close onClick={() => props.closeModel()} />}
        >
          <ModalNavigation title={header} />
          <Modal.Content>
            <p>
              {message}{" "}
              <a
                href="https://chrome.google.com/webstore/detail/xinpay/bocpokimicclpaiekenaeelehdjllofo"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
            </p>
          </Modal.Content>
        </Modal>
      ) : null}
    </>
  );
};

export default React.memo(WalletModel);
