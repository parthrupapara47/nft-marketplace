// export const marketPlaceContractAddress = "0x191ef416ee2a736578be1f6c31e7869d423ca807";
export const marketPlaceContractAddress =
  "0xF53E4Ef250aB19116d6bdddffF739be24D0C37f8";

export const marketPlaceAbi = [
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
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "price",
        type: "uint256",
      },
    ],
    name: "getSaleShareAmount",
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
    constant: false,
    inputs: [
      {
        name: "nftAddress",
        type: "address",
      },
      {
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "nftAddress",
        type: "address",
      },
      {
        name: "assetId",
        type: "uint256",
      },
      {
        name: "priceInWei",
        type: "uint256",
      },
      {
        name: "expiresAt",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    payable: true,
    stateMutability: "payable",
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
  {
    constant: true,
    inputs: [],
    name: "publicationFeeInWei",
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
    constant: false,
    inputs: [
      {
        name: "nftAddress",
        type: "address",
      },
      {
        name: "assetId",
        type: "uint256",
      },
      {
        name: "price",
        type: "uint256",
      },
    ],
    name: "executeOrder",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_publicationFee",
        type: "uint256",
      },
    ],
    name: "setPublicationFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    ],
    name: "orderByAssetId",
    outputs: [
      {
        name: "id",
        type: "bytes32",
      },
      {
        name: "seller",
        type: "address",
      },
      {
        name: "nftAddress",
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
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        name: "priceInWei",
        type: "uint256",
      },
      {
        indexed: false,
        name: "expiresAt",
        type: "uint256",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        name: "totalPrice",
        type: "uint256",
      },
      {
        indexed: true,
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderSuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "OrderCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "publicationFee",
        type: "uint256",
      },
    ],
    name: "ChangedPublicationFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "ownerCutPerMillion",
        type: "uint256",
      },
    ],
    name: "ChangedOwnerCutPerMillion",
    type: "event",
  },
];
