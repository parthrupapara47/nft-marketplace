import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Page } from "decentraland-ui";
import { useParams } from "react-router-dom";
import { nft } from "../../graphql/decentraland";
import { Navbar } from "../Navbar";
import { WearableDetails } from "../WearableDetails";
import { NFT } from "../../modules/nft/types";
import { Footer } from "../Footer";
import { NotFound } from "../NotFound";

const NftPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNftData] = useState<NFT | undefined>(undefined);
  const nftDetails: any = useQuery(nft, { variables: { id: id } });

  useEffect(() => {
    if (typeof nftDetails.data !== "undefined") {
      setNftData(nftDetails.data.nftdata);
    }
  }, [nftDetails, id]);

  return (
    <>
      <Navbar />
      <Page className="NFTPage" isFullscreen>
        {nftData === undefined ? (
          <Loader active size="huge" inline="centered" />
        ) : (
          <>
            {nftData === null ? (
              <NotFound />
            ) : <WearableDetails nft={nftData} />
            }
          </>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default NftPage;
