import React from "react";
import "./NftImage.css";
import { RARITY_COLOR, RARITY_COLOR_LIGHT, NFT } from "../../modules/nft/types";
import { getNFTName } from "../../modules/utilis";

type Props = {
  nft: NFT;
  isDraggable: boolean;
  zoom?: number;
};

const NftImage: React.FC<Props> = (props: Props) => {
  const { nft } = props;

  const renderImage = () => {
    switch (nft.category) {
      case "wearable":
        return (
          <div
            className="rarity-background"
            style={{
              backgroundImage: `radial-gradient(${
                RARITY_COLOR_LIGHT[nft.searchWearableRarity]
              }, ${RARITY_COLOR[nft.searchWearableRarity]})`,
            }}
          >
            <img alt={getNFTName(nft)} className="image" src={nft.image} />
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="NFTImage">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII="
        alt="pixel"
        className="pixel"
      />
      <div className="image-wrapper">{renderImage()}</div>
    </div>
  );
};

export default React.memo(NftImage);
