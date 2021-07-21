import { useQuery } from "@apollo/client";
import {
  Container,
  Dropdown,
  DropdownProps,
  Header,
  Loader,
  Page,
  Radio,
  Responsive,
} from "decentraland-ui";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { nfts } from "../../graphql/decentraland";
import { Navbar } from "../Navbar";
import { NftCard } from "../NftCard";
import { sideMenuData } from "./Browse.data";
import "./Browse.css";
import { NFT } from "../../modules/nft/types";
import { Footer } from "../Footer";

enum SortBy {
  NAME = "name",
  NEWEST = "createdAt",
  RECENTLY_LISTED = "updatedAt",
  CHEAPEST = "searchOrderPrice",
}

const Browse: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const history = useHistory();
  const [NftList, setNftList] = useState<Array<NFT> | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<any>(category || "all");
  const [serchValue, setSerchValue] = useState<string>();
  const [debounceValue, setDebounceValue] = useState<string>();
  const [onSale, setOnSale] = useState<boolean>(true);
  const [dropDownValue, setDropDownValue] = useState<SortBy>(
    SortBy.RECENTLY_LISTED
  );
  const decentralandData: any = useQuery(nfts, {
    variables: {
      first: 24,
      orderBy: dropDownValue,
      orderDirection: dropDownValue === SortBy.CHEAPEST ? "asc" : "desc",
      where: {
        category:
          selectedValue !== undefined && selectedValue !== "all"
            ? selectedValue
            : undefined,
        category_not: undefined,
        name_contains: debounceValue,
        updatedAt_gt: 1,
        searchOrderStatus: onSale ? "open" : undefined,
      },
    },
  });

  useEffect(() => {
    setNftList(undefined);
    if (decentralandData.data !== undefined) {
      setNftList(decentralandData.data.nfts);
    }
  }, [category, decentralandData, debounceValue]);

  const onSerchChange = (e: any) => {
    setSerchValue(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (debounceValue !== serchValue) {
        setDebounceValue(serchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [serchValue]);

  const selectSideMenu = (value: string) => {
    setNftList(undefined);
    history.push(`/browse/${value}`);
    switch (value) {
      case "all":
      case "wearable":
      case "parcel":
      case "estate":
      case "ens":
        return setSelectedValue(value);
      default:
        break;
    }
  };

  const dropdownOptions = [
    { value: SortBy.NEWEST, text: "Newest" },
    { value: SortBy.NAME, text: "Name" },
  ];

  if (onSale) {
    dropdownOptions.unshift({
      value: SortBy.RECENTLY_LISTED,
      text: "Recently Listed",
    });
    dropdownOptions.unshift({
      value: SortBy.CHEAPEST,
      text: "Cheapest",
    });
  }

  const renderCard = () => {
    return NftList?.map((nft: NFT, index: number) => (
      <NftCard key={index} nft={nft} index={index} />
    ));
  };

  return (
    <>
      <Navbar />
      <Page className="NFTBrowse">
        <Container style={{ paddingTop: "30px" }}>
          <div className="Row">
            <div className="Column left sidebar">
              <Header sub>categories</Header>
              <ul className="Menu NFTSections">
                {sideMenuData.map((each, index) => {
                  return (
                    <li
                      key={index}
                      className={`MenuItem ${
                        selectedValue === each.name ? "active" : null
                      }`}
                      onClick={() => selectSideMenu(each.name)}
                    >
                      <div className="content">{each.label}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="Column left grow">
              <div className="NFTFilters">
                <div className="topbar">
                  <div className="TextFilter Filter">
                    <div className="text-input">
                      <input
                        placeholder="search"
                        onChange={(e) => onSerchChange(e)}
                      />
                    </div>
                  </div>
                  <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    className="topbar-filter"
                  >
                    <Dropdown
                      direction="right"
                      options={dropdownOptions}
                      value={dropDownValue}
                      onChange={(e, value: DropdownProps) =>
                        setDropDownValue(value.value as SortBy)
                      }
                    />
                  </Responsive>
                  <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    className="topbar-filter"
                  >
                    <Radio
                      toggle
                      checked={onSale}
                      onChange={() => setOnSale(!onSale)}
                      label="ON SaLe"
                    />
                  </Responsive>
                </div>
              </div>
              {NftList?.length !== undefined ? (
                <>
                  <div className="ui cards">
                    {NftList.length !== 0 ? renderCard() : null}
                  </div>
                  {NftList.length === 0 ? (
                    <div className="empty">Result Not Found</div>
                  ) : null}
                </>
              ) : (
                <Loader active size="huge" inline="centered" />
              )}
            </div>
          </div>
        </Container>
      </Page>
      <Footer />
    </>
  );
};

export default Browse;
