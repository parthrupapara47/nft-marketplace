import React, { useEffect, useState } from "react";
import { Hero, Page } from "decentraland-ui";
import { Button } from "decentraland-ui";
import { Navbar } from "../Navbar";
import { SlideShow } from "../SlideShow.tsx";
import { useQuery } from "@apollo/client";
import { nfts } from "../../graphql/decentraland";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";
import { NFT } from "../../modules/nft/types";
import "./Home.css";

const Home: React.FC = () => {
  const [nftWearable, setNftWearable] = useState<NFT[]>([]);

  const getNftWearables = useQuery(nfts, {
    variables: {
      first: 15,
      where: {
        category: "wearable",
        updatedAt_gt: 1,
        searchOrderStatus: "open",
      },
    },
  });

  useEffect(() => {
    if (getNftWearables.data !== undefined) {
      setNftWearable(getNftWearables.data.nfts);
    }
  }, [getNftWearables]);

  return (
    <div className="home HomePageHero">
      <Navbar />
      <Hero className="HomePageHero">
        <Hero.Header>{"XinFin MarketPlace"}</Hero.Header>
        <Hero.Description>
          {
            "Welcome to the virtual world’s one-stop-shop for the very best digital"
          }
          {"assets."}
        </Hero.Description>
        <Hero.Content>
          <div className="hero-image" />
        </Hero.Content>
        <Hero.Actions>
          <Link to="/browse">
            <Button primary>{"start browsing"}</Button>
          </Link>
        </Hero.Actions>
      </Hero>
      <Page className="HomePage">
        <SlideShow nfts={nftWearable} title="Wearable" link="wearable" />
      </Page>
      <Footer />
    </div>
  );
};

export default Home;
