import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Page } from "decentraland-ui";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { nft } from "../../graphql/decentraland";
import { NFT } from "../../modules/nft/types";
import { BuyModal } from "../BuyModal";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { NotFound } from "../NotFound";
import { WalletProvider } from "../WalletProvider";

const NFTBuy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNftData] = useState<NFT | undefined>(undefined);
  const nftDetails: any = useQuery(nft, { variables: { id: id } });

  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });

  useEffect(() => {
    if (typeof nftDetails.data !== "undefined") {
      setNftData(nftDetails.data.nftdata);
    }
  }, [nftDetails, id]);
  return (
    <>
      <Navbar />
      <Page className="BuyPage">
        <WalletProvider>
          {nftData === undefined ? (
            <Loading />
          ) : nftData === null ? (
            <NotFound />
          ) : (
            <BuyModal nft={nftData} wallet={wallet} />
          )}
        </WalletProvider>
      </Page>
      <Footer />
    </>
  );
};

const Loading = () => (
  <div className="nft-center">
    <Loader active size="huge" />
  </div>
);

export default NFTBuy;
