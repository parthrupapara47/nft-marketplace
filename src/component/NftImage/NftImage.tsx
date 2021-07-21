import React, { useCallback } from "react";
import { Atlas as AtlasComponent } from "decentraland-ui";
import "./NftImage.css";
import yearsToMonths from "date-fns/esm/yearsToMonths/index";
import { RARITY_COLOR, RARITY_COLOR_LIGHT, NFT } from "../../modules/nft/types";

type Props = {
  nft: NFT;
  isDraggable: boolean;
};

const NftImage: React.FC<Props> = (props: Props) => {
  const { nft, isDraggable } = props;
  let selected: any = [];

  const getCenter = (selection: { x: number; y: number }[]) => {
    const xs = selection.map((coords) => coords.x).sort();
    const ys = selection.map((coords) => coords.y).sort();
    const x = xs[(xs.length / 2) | 0];
    const y = ys[(ys.length / 2) | 0];
    return [x, y];
  };

  const isSelected = useCallback(
    (x: number, y: number) => {
      return selected.some((coord: any) => coord.x === x && coord.y === y);
    },
    [selected]
  );

  const selectedStrokeLayer = useCallback(
    (x, y) => {
      return isSelected(x, y) ? { color: "#ff0044", scale: 1.4 } : null;
    },
    [isSelected]
  );

  const selectedFillLayer = useCallback(
    (x, y) => {
      return isSelected(x, y) ? { color: "#ff9990", scale: 1.2 } : null;
    },
    [isSelected]
  );

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
            <img alt={nft.name} className="image" src={nft.image} />
          </div>
        );
      case "parcel":
        selected.push({
          x: +nft.parcel?.x,
          y: +nft.parcel?.y,
        });
        return (
          <AtlasComponent
            zoom={0.5}
            x={+nft.searchParcelX}
            y={+nft.searchParcelY}
            isDraggable={isDraggable}
            layers={[selectedStrokeLayer, selectedFillLayer]}
          />
        );
      case "estate":
        const selectedItem = nft.estate.parcels?.map((each: any) => {
          return {
            x: +each.x,
            y: +each.y,
          };
        });
        selected = selectedItem === undefined ? [] : selectedItem;
        const [x, y] = getCenter(selected);
        return (
          <AtlasComponent
            zoom={0.5}
            x={x}
            y={y}
            isDraggable={isDraggable}
            layers={[selectedStrokeLayer, selectedFillLayer]}
          />
        );
      case "ens":
        return (
          <div className="ens-subdomain small">
            <div className="name">{nft.name}</div>
            <div className="monospace">{nft.name}</div>
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
