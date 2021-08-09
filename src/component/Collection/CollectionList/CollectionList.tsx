import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "decentraland-ui";
import { Card as NewCard } from "../../Card";
import { NewCollection } from "../NewCollection";
import "./CollectionList.css";
import { Navbar } from "../../Navbar";
import { Leftcolumn } from "../../Leftcolumn";
import { Hero } from "../../Hero";
import { heroDetails } from "./CollectionList.data";
import { Footer } from "../../Footer";
import { WalletProvider } from "../../WalletProvider";
import { marketPlaceContract, nftContract } from "../../../contract/methods";

const CollectionList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [cards, setCards] = useState([]);
  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  console.log("nft Contract", nftContract.methods);
  console.log("marketplace contract", marketPlaceContract.methods);

  const collection = useSelector(
    (state: any) => state.collectionReducer.collectionList
  );
  useEffect(() => {
    setCards(collection);
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div></div>
      {/* <Page className="NFTBrowse"> */}
      <WalletProvider>
        <div className="collection Row">
          <div className="leftcolumn Column left sidebar">
            <Leftcolumn />
          </div>
          <div className="collectionbody Column right grow">
            <Hero
              header={heroDetails.header}
              description={heroDetails.description}
            />
            <Card.Group className="collectionlist">
              <NewCollection modal={modal} setModal={closeModal} />
              <Card onClick={() => setModal(true)}>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <i
                      className="fa fa-plus"
                      style={{
                        fontSize: "100px",
                        textAlign: "center",
                        color: "black",
                      }}
                    />
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    <h3>Create New Collection</h3>
                  </Card.Meta>
                </Card.Content>
              </Card>
              {cards !== []
                ? cards.map((card: any, index: number) => (
                    <NewCard
                      key={index}
                      link={`/collection/${card.id}`}
                      image={card.image}
                      meta={card.name}
                    />
                  ))
                : null}
            </Card.Group>
          </div>
        </div>
      </WalletProvider>
      {/* </Page> */}
      <Footer />
    </div>
  );
};

export default CollectionList;
