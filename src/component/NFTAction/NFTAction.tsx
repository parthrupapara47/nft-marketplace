import { Column, Row } from "decentraland-ui";
import React from "react";
import { Link } from "react-router-dom";
import { NFT } from "../../modules/nft/types";
import { NftImage } from "../NftImage";

type Props = {
  nft: NFT;
  children: React.ReactNode;
};

const NFTAction: React.FC<Props> = (props: Props) => {
  const { nft, children } = props;
  return (
    <div className="NFTAction">
      <Link to={`/contracts/${nft.id}`}>
        <div className="back" />
      </Link>
      <div className="Row">
        <div className="Column left">
          <div className="nft-image-wrapper">
            <NftImage nft={nft} zoom={1} isDraggable={false} />
          </div>
        </div>
        <div className="Column right">{children}</div>
      </div>
    </div>
  );
};

export default NFTAction;
