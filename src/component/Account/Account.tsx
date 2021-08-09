import { Loader, Page, Profile } from "decentraland-ui";
import React, { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Icon } from "semantic-ui-react";
import { isMobile } from "decentraland-dapps/dist/lib/utils";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTimer } from "../../customHooks/timer";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { NFTBrowse } from "../NFTBrowse";

const Account: React.FC = () => {
  const history = useHistory();
  const { address } = useParams<{ address: string }>();

  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });
  const { isConnected, eth, isConnecting } = wallet;
  const [hasCopiedAddress, setHasCopiedAddress] = useTimer(1200);
  const isCurrentAccount =
    address === undefined || (wallet && wallet.accounts === address);
  // Redirect to signIn if trying to access current account without a wallet
  useEffect(() => {
    if (isCurrentAccount && !isConnecting && !wallet) {
      history.push("/sign");
    }
  }, [isCurrentAccount, isConnecting, wallet]);

  return (
    <div className="AccountPage">
      <Navbar />
      <div></div>
      {isCurrentAccount ? (
        isConnecting || !wallet ? (
          <Page>
            <Loader size="massive" active />
          </Page>
        ) : (
          <NFTBrowse
            // vendor={vendor}
            address={wallet.accounts}
            // view={View.ACCOUNT}
          />
        )
      ) : address !== undefined ? (
        <>
          <div className="PageHeader">
            <div className="Column left">
              <Profile
                address={address}
                size="massive"
                imageOnly
                inline={false}
              />
              <div className="profile-name">
                <Profile address={address} textOnly inline={false} />
              </div>
              <div className="profile-address">
                <div className="profile-address-hash">{address}</div>
                {!isMobile() && (
                  <div>
                    <CopyToClipboard
                      text={address}
                      onCopy={setHasCopiedAddress}
                    >
                      <Icon
                        aria-label="Copy address"
                        aria-hidden="false"
                        className="copy"
                        name="copy outline"
                      />
                    </CopyToClipboard>
                    {hasCopiedAddress && (
                      <span className="profile-copied-text-desktop copied">
                        {"Copied ✔"}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {isMobile() && (
                <div className="profile-copy-text-mobile">
                  <CopyToClipboard text={address} onCopy={setHasCopiedAddress}>
                    {hasCopiedAddress ? (
                      <span className="copied">{"COPIED ✔"}</span>
                    ) : (
                      <span className="copy">{"COPY ADDRESS"}</span>
                    )}
                  </CopyToClipboard>
                </div>
              )}
            </div>
          </div>

          <NFTBrowse
            //   vendor={vendor}
            address={address}
            //   view={View.ACCOUNT}
          />
        </>
      ) : null}
      <Footer />
    </div>
  );
};

export default Account;
