import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "decentraland-ui";
import { Icon } from "semantic-ui-react";
import { Navbar } from "../../Navbar";
import { Leftcolumn } from "../../Leftcolumn";
import { Hero } from "../../Hero";
import { Table } from "../../Table";
import "./ItemDetails.css";
import {
  itemListHeader,
  itemListBody,
  dropDownOptation,
} from "./ItemDetails.data";
import { Footer } from "../../Footer";

const ItemDetails: React.FC = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const { itemId } = useParams<{ itemId: string }>();
  const [sort, setSort] = useState<any>(dropDownOptation[0].value);
  const getItems = useSelector(
    (state: any) => state.collectionReducer.collectionList
  );
  useEffect(() => {
    const itemDetails = getItems.find(
      (items: any) => items.id.toString() === itemId
    );
    setItemsList(itemDetails);
  }, []);
  return (
    <div className="newitems">
      <Navbar />
      <div className="collection" style={{ display: "flex" }}>
        <div className="leftcolumn">
          <Leftcolumn />
        </div>
        <div className="itemslist" style={{ paddingRight: "10px" }}>
          {itemsList !== {} ? (
            <>
              <Hero
                header={itemsList?.name}
                description={itemsList?.description}
              />
              <div>
                <div className="Container">
                  <span className="addnewitems">
                    <Link to={`/collection/${itemId}/additem`}>
                      <Button primary>Add New Items</Button>
                    </Link>
                  </span>
                  <span className="status">
                    <Link to={`/collection/${itemId}/itemstatus`}>
                      <i className="chart line icon"></i>
                      <a>Status</a>
                    </Link>
                  </span>
                  <span className="edit">
                    <Button basic>
                      <Icon name="edit" />
                      Edit
                    </Button>
                  </span>
                </div>
                <div className="search-short">
                  <div className="search-input">
                    <i className="search icon"></i>
                    <input placeholder="search" />
                  </div>
                  <div className="sort-input">
                    <Dropdown
                      direction="right"
                      options={dropDownOptation}
                      value={sort}
                      onChange={(e, { value }) => setSort(value)}
                    />
                  </div>
                </div>
              </div>
              <Table header={itemListHeader} body={itemListBody} />
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
