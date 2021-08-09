import { useQuery } from "@apollo/client";
import { Loader, Page } from "decentraland-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { nft } from "../../graphql/decentraland";
import { NFT } from "../../modules/nft/types";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { NotFound } from "../NotFound";
import { SellModal } from "../SellModal";
import { WalletProvider } from "../WalletProvider";

const SellPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNftData] = useState<NFT | undefined>(undefined);
  const nftDetails: any = useQuery(nft, { variables: { id: id } });

  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });

  useEffect(() => {
    if (typeof nftDetails.data !== "undefined") {
      setNftData(nftDetails.data.nft);
    }
  }, [nftDetails, id]);
  return (
    <>
      <Navbar />
      <Page className="SellPage">
        <WalletProvider>
          {nftData === undefined || wallet.isConnecting ? (
            <Loading />
          ) : nftData === null ? (
            <NotFound />
          ) : (
            <SellModal nft={nftData} wallet={wallet} />
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

export default SellPage;
