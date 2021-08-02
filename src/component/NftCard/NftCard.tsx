import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Mana } from "decentraland-ui";
import { NftImage } from "../NftImage";
import { RARITY_COLOR, RARITY_TITLE } from "../../modules/nft/types";
import { NFT } from "../../modules/nft/types";
import "./NftCard.css";
import { isUnisex } from "../../modules/Wearable/utils";
import { getNFTName } from "../../modules/utilis";

interface Props {
  nft: NFT;
  allNft?: any;
  index?: number;
}

const Nftcard: React.FC<Props> = (props: Props) => {
  const { nft } = props;

  return (
    <Card className="NFTCard" link as={Link} to={`/contracts/${nft.id}`}>
      <NftImage nft={nft} isDraggable={false} />
      <Card.Content>
        <Card.Header>
          <div className="title">{getNFTName(nft)?.substr(0, 20)}</div>{" "}
          {nft.searchOrderPrice !== null ? (
            <Mana inline>{Math.floor(nft.searchOrderPrice / 10 ** 18)}</Mana>
          ) : null}
        </Card.Header>
        <Card.Meta>Xinfin</Card.Meta>
        {nft.category === "wearable" ? (
          <div className="WearableTags tags">
            <div
              title={RARITY_TITLE[nft.searchWearableRarity]}
              className="rarity"
              style={{
                backgroundColor: RARITY_COLOR[nft.searchWearableRarity],
              }}
            >
              {nft.searchWearableRarity}
            </div>
            <div
              className={`icon ${nft.searchWearableCategory}`}
              title={nft.searchWearableCategory}
            ></div>
            {isUnisex(nft.searchWearableBodyShapes) ? (
              <div className="icon Unisex" title="Unisex" />
            ) : (
              <div className={"icon " + nft.searchWearableBodyShapes[0]} />
            )}
          </div>
        ) : null}
        {nft.category === "parcel" ? (
          <>
            <div className="ParcelTags tags">
              <div className="coords">
                <div className="pin" />
                {nft.searchParcelX},{nft.searchParcelY}
              </div>
            </div>
          </>
        ) : null}
        {nft.category === "estate" ? (
          <>
            <div className="EstateTags tags">
              <div className="size">
                {nft.estate?.parcels?.length} {"LAND"}
              </div>
            </div>
          </>
        ) : null}
        {nft.category === "ens" ? (
          <>
            <div className="ENSTags tags">
              <div className="badge">Name</div>
            </div>
          </>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default React.memo(Nftcard);
