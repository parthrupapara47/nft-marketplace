import { useQuery } from "@apollo/client";
import { Loader, Page } from "decentraland-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bidContract } from "../../contract/methods";
import { nft } from "../../graphql/decentraland";
import { NFT } from "../../modules/nft/types";
import { BidModal } from "../BidModal";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { NotFound } from "../NotFound";
import { WalletProvider } from "../WalletProvider";

const NFTBid: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNftData] = useState<NFT | null>(null);
  const nftDetails: any = useQuery(nft, { variables: { id: id } });

  const wallet = useSelector((state: any) => {
    return state.xinfinWallet;
  });

  console.log(bidContract.methods);

  useEffect(() => {
    if (typeof nftDetails.data !== "undefined") {
      setNftData(nftDetails.data.nft);
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
            <BidModal nft={nftData} wallet={wallet} />
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

export default NFTBid;
