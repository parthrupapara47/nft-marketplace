export const bidContractAddress = "0x1aa70891f239dd58df619b064c6d1f7dd862029e";

export const bidAbi = [
  {
    constant: false,
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "cancelBid",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "",
        type: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
      },
      {
        name: "_data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
      },
      {
        name: "_price",
        type: "uint256",
      },
      {
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "placeBid",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenAddresses",
        type: "address[]",
      },
      {
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        name: "_bidders",
        type: "address[]",
      },
    ],
    name: "removeExpiredBids",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_ownerCutPerMillion",
        type: "uint256",
      },
    ],
    name: "setOwnerCutPerMillion",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_ownerCutPerMillion",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "_tokenAddress",
        type: "address",
      },
      {
        indexed: true,
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "_bidder",
        type: "address",
      },
      {
        indexed: false,
        name: "_price",
        type: "uint256",
      },
      {
        indexed: false,
        name: "_expiresAt",
        type: "uint256",
      },
    ],
    name: "BidCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "_tokenAddress",
        type: "address",
      },
      {
        indexed: true,
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        name: "_bidder",
        type: "address",
      },
      {
        indexed: true,
        name: "_seller",
        type: "address",
      },
      {
        indexed: false,
        name: "_price",
        type: "uint256",
      },
      {
        indexed: false,
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "BidAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "_tokenAddress",
        type: "address",
      },
      {
        indexed: true,
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "_bidder",
        type: "address",
      },
    ],
    name: "BidCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_ownerCutPerMillion",
        type: "uint256",
      },
    ],
    name: "ChangedOwnerCutPerMillion",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "bidCounterByToken",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "address",
      },
    ],
    name: "bidIdByTokenAndBidder",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "bidIndexByBidId",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
      },
      {
        name: "_bidder",
        type: "address",
      },
    ],
    name: "getBidByBidder",
    outputs: [
      {
        name: "bidIndex",
        type: "uint256",
      },
      {
        name: "bidId",
        type: "bytes32",
      },
      {
        name: "bidder",
        type: "address",
      },
      {
        name: "price",
        type: "uint256",
      },
      {
        name: "expiresAt",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
      },
      {
        name: "_tokenId",
        type: "uint256",
      },
      {
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getBidByToken",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_BID_DURATION",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MIN_BID_DURATION",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "ONE_MILLION",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "ownerCutPerMillion",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
