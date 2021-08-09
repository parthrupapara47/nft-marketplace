import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card as NewCard } from "../../Card";
import { Card } from "decentraland-ui";
import { Leftcolumn } from "../../Leftcolumn";
import { Navbar } from "../../Navbar";
import { Hero } from "../../Hero";
import "./Payout.css";
import { DESCRIPTION, HEADER } from "./PayoutList.data";
import { Footer } from "../../Footer";
import { WalletProvider } from "../../WalletProvider";

const Payout: React.FC = () => {
  const [cards, setCards] = useState([]);

  const collection = useSelector(
    (state: any) => state.collectionReducer.collectionList
  );

  useEffect(() => {
    setCards(collection);
  }, [collection]);

  return (
    <div className="homepage">
      <Navbar />
      <WalletProvider>
        <div className="payout" style={{ display: "flex" }}>
          <div className="leftcolumn">
            <Leftcolumn />
          </div>
          <div className="payout_body" style={{ paddingRight: "10px" }}>
            <Hero header={HEADER} description={DESCRIPTION} />
            <Card.Group className="payout_list">
              {cards !== []
                ? cards.map((card: any, index: number) => (
                    <NewCard
                      key={index}
                      link={`/payout/${card.id}`}
                      image={card.image}
                      meta={card.name}
                    />
                  ))
                : null}
            </Card.Group>
          </div>
        </div>
      </WalletProvider>
      <Footer />
    </div>
  );
};

export default Payout;
