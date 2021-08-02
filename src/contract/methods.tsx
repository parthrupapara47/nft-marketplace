import Web3 from "web3";
import { bidContractAddress, bidAbi } from "./bid";
import { marketPlaceAbi, marketPlaceContractAddress } from "./marketPlace";
import { nftAbi, nftContractAddress } from "./nft";

declare let window: any;

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
} else if (window.web3) {
  window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
}
const web3 = window.web3;

export const nftContract = web3
  ? new web3.eth.Contract(nftAbi, nftContractAddress)
  : undefined;
export const bidContract = web3
  ? new web3.eth.Contract(bidAbi, bidContractAddress)
  : undefined;
export const marketPlaceContract = web3
  ? new web3.eth.Contract(marketPlaceAbi, marketPlaceContractAddress)
  : undefined;
