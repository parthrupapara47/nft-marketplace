import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Page } from "decentraland-ui";
import { useParams } from "react-router-dom";
import { nft } from "../../graphql/decentraland";
import { Navbar } from "../Navbar";
import { WearableDetails } from "../WearableDetails";
import { NameDetails } from "../NameDetails";
import { ParcelDetails } from "../ParcelDetails";
import { NFT } from "../../modules/nft/types";
import { EstateDetails } from "../EstateDetails";
import { Footer } from "../Footer";
import { NotFound } from "../NotFound";

const NftPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nftData, setNftData] = useState<NFT | undefined>(undefined);
  const nftDetails: any = useQuery(nft, { variables: { id: id } });

  useEffect(() => {
    if (typeof nftDetails.data !== "undefined") {
      setNftData(nftDetails.data.nft);
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
            ) : (
              <>
                {nftData.category === "wearable" ? (
                  <WearableDetails nft={nftData} />
                ) : null}
                {nftData.category === "parcel" ? (
                  <ParcelDetails nft={nftData} />
                ) : null}
                {nftData.category === "estate" ? (
                  <EstateDetails nft={nftData} />
                ) : null}
                {nftData.category === "ens" ? (
                  <NameDetails nft={nftData} />
                ) : null}
              </>
            )}
          </>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default NftPage;
