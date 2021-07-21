import React from "react";
import { Button, Header, HeaderMenu, Loader } from "decentraland-ui";
import { NftCard } from "../NftCard";
import "./SlideShow.css";
import { Link } from "react-router-dom";
import { link } from "fs";
import { NFT } from "../../modules/nft/types";

interface Props {
  title?: string;
  nfts?: NFT[];
  link: string;
}

const SlideShow: React.FC<Props> = (props: Props) => {
  const { title, nfts } = props;
  const renderNfts = () =>
    nfts
      ?.slice(0, 10)
      .map((nft: any, index, array) => <NftCard key={index} nft={nft} />);

  return (
    <div className="Slideshow">
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>{title}</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Link to={`/browse/${props.link}`}>
            <Button basic>
              view All
              <i className="caret" />
            </Button>
          </Link>
        </HeaderMenu.Right>
      </HeaderMenu>
      <div className="nfts">
        {nfts?.length !== 0 ? renderNfts() : <Loader active size="huge" />}
      </div>
    </div>
  );
};

SlideShow.defaultProps = {};

export default React.memo(SlideShow);
