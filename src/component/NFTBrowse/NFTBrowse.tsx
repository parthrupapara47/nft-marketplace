import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Container,
  Dropdown,
  DropdownProps,
  Header,
  Loader,
  Page,
  Radio,
  Responsive,
  Tabs,
} from "decentraland-ui";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { nft, nfts } from "../../graphql/decentraland";
import { Navbar } from "../Navbar";
import { NftCard } from "../NftCard";
import { sideMenuData } from "../Browse/Browse.data";
import { NFT } from "../../modules/nft/types";
import { Footer } from "../Footer";
import { getMaxQuerySize, MAX_PAGE, VendorName } from "../../modules/utilis";

enum SortBy {
  NAME = "name",
  NEWEST = "createdAt",
  RECENTLY_LISTED = "updatedAt",
  CHEAPEST = "searchOrderPrice",
}

type NftPage = {
  nftNo: number;
  pageNo: number;
  loadding: boolean;
};
const initPageNo = { nftNo: 24, pageNo: 1, loadding: false };

interface Props {
  address?: string;
}

const NFTBrowse: React.FC<Props> = (props: Props) => {
  const { category } = useParams<{ category: string }>();
  const history = useHistory();
  const [NftList, setNftList] = useState<Array<NFT>>([]);
  const [selectedValue, setSelectedValue] = useState<any>(category || "all");
  const [serchValue, setSerchValue] = useState<string>("");
  const [debounceValue, setDebounceValue] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(true);
  const [loadNft, setLoadNft] = useState<NftPage>(initPageNo);
  const [loadding, setLoadding] = useState<boolean>(true);
  const [dropDownValue, setDropDownValue] = useState<SortBy>(
    SortBy.RECENTLY_LISTED
  );

  const decentralandData = useQuery(nfts, {
    variables: {
      skip: loadNft.nftNo * (loadNft.pageNo - 1),
      first: 24,
      orderBy: dropDownValue,
      orderDirection: dropDownValue === SortBy.CHEAPEST ? "asc" : "desc",
      where: {
        owner: props.address,
        // category:
        //   selectedValue !== undefined && selectedValue !== "all"
        //     ? selectedValue
        //     : undefined,
        category: "wearable",
        name_contains: debounceValue,
        updatedAt_gt: 1,
        searchOrderStatus: onSale ? "open" : undefined,
      },
    },
  });

  useEffect(() => {
    setLoadNft(initPageNo);
    setLoadding(true);
  }, [category, debounceValue, onSale]);

  useEffect(() => {
    if (decentralandData.data !== undefined && loadNft.pageNo === 1) {
      setNftList(decentralandData.data.nfts);
      setLoadding(false);
    } else if (
      decentralandData.data !== undefined &&
      NftList.length !== 0 &&
      loadNft.pageNo !== 1
    ) {
      setNftList([...NftList, ...decentralandData.data.nfts]);
      setLoadNft({ ...loadNft, loadding: false });
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

  useEffect(() => {
    if (!onSale) setDropDownValue(SortBy.NEWEST);
  }, [onSale]);

  const selectSideMenu = (value: string) => {
    // history.push(`/browse/${value}`);
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

  const maxQuerySize = getMaxQuerySize(VendorName.DECENTRALAND);

  const hasExtraPages =
    (NftList.length >= loadNft.pageNo * 24 && loadNft.pageNo <= MAX_PAGE) ||
    loadNft.loadding;

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

  const handleLoadMore = () => {
    const pageNo = loadNft.pageNo + 1;
    setLoadNft({ ...loadNft, pageNo, loadding: true });
  };

  const renderCard = () => {
    return NftList.map((nft: NFT, index: number) => (
      <NftCard key={index} nft={nft} index={index} />
    ));
  };

  return (
    <Page className="NFTBrowse">
      <div className="Row">
        <div className="Column left sidebar">
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <div className="NFTSidebar">
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
          </Responsive>
        </div>
        <div className="Column right grow">
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
          {!loadding ? (
            <>
              <Card.Group>
                {NftList.length !== 0 ? renderCard() : null}
              </Card.Group>
              {NftList.length === 0 ? (
                <div className="empty">Result Not Found</div>
              ) : null}
              {NftList.length > 0 && hasExtraPages ? (
                <div className="load-more">
                  <Button
                    loading={loadNft.loadding}
                    primary
                    onClick={handleLoadMore}
                  >
                    {"Load more"}
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <Loader active size="huge" inline="centered" />
          )}
        </div>
      </div>
    </Page>
  );
};

export default NFTBrowse;
