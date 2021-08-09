import { fromWei } from "web3x-es/utils";
import addDays from "date-fns/addDays";
import dateFnsFormat from "date-fns/format";
import { Category, NFT } from "../nft/types";
import { WalletState } from "../reducers/xinfinWallet";

export const DEFAULT_EXPIRATION_IN_DAYS = 30;
export const INPUT_FORMAT = "yyyy-MM-dd";

type Contract = {
  category: "art" | null;
  vendor: null;
  name: string;
  network: string;
};

export enum VendorName {
  DECENTRALAND = "decentraland",
  SUPER_RARE = "super_rare",
  MAKERS_PLACE = "makers_place",
  KNOWN_ORIGIN = "known_origin",
}

export let contracts: Contract[] = [];

export const getDefaultExpirationDate = (date = Date.now()) =>
  dateFnsFormat(
    addDays(new Date(date), DEFAULT_EXPIRATION_IN_DAYS),
    INPUT_FORMAT
  );

export function formatMANA(value: string) {
  return Number(fromWei(value, "ether")).toLocaleString();
}

export function toMANA(num: number) {
  return num > 0 ? num.toString() : "";
}

export function fromMANA(mana: string) {
  const num = mana.split(/[,|.]/).join("");

  const result = parseInt(num, 10);

  if (isNaN(result) || result < 0) {
    return 0;
  }

  return result;
}

export function addressEquals(address1?: string, address2?: string) {
  return (
    address1 !== undefined &&
    address2 !== undefined &&
    address1.toLowerCase() === address2.toLowerCase()
  );
}

export function isOwnedBy(nft: NFT, wallet: WalletState | null) {
  return addressEquals(wallet?.accounts, nft.owner.id);
}

export function getNFTName(nft: NFT) {
  if (nft.name) {
    return nft.name;
  }

  switch (nft.category) {
    case Category.PARCEL:
      return "Parcel";

    case Category.ESTATE:
      return "Estate";

    case Category.WEARABLE:
      return "Werable";

    case Category.ENS:
      return "Name";

    case "art":
      return "Art";

    default:
      return "NFT";
  }
}

export const MAX_QUERY_SIZE = 1000;
export const MAX_PAGE = 10000;
export const PAGE_SIZE = 24;

export function getMaxQuerySize(vendor: VendorName) {
  switch (vendor) {
    case VendorName.DECENTRALAND:
      return MAX_QUERY_SIZE;
    case VendorName.SUPER_RARE:
      return MAX_QUERY_SIZE;
    case VendorName.MAKERS_PLACE:
      return MAX_QUERY_SIZE;
    case VendorName.KNOWN_ORIGIN:
      return MAX_QUERY_SIZE;
  }
}

export const MaxFileSize = 2 * 1024 * 1024;
